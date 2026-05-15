<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait CsvImportable
{
    public function importCsv(Request $request, $modelClass, $rules)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $handle = fopen($file->getRealPath(), 'r');
        $header = array_map('trim', fgetcsv($handle));
        
        // Basic check: all required keys in rules should be in header
        $requiredKeys = array_keys($rules);
        $missingKeys = array_diff($requiredKeys, $header);
        
        if (count($missingKeys) > 0) {
            fclose($handle);
            return back()->withErrors(['import_errors' => ['Missing columns in CSV: ' . implode(', ', $missingKeys)]]);
        }

        $importedCount = 0;
        $errors = [];
        $rowNumber = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $rowNumber++;
            
            if (count($header) !== count($row)) {
                $errors[] = "Row {$rowNumber}: Column count mismatch (Expected ".count($header).", got ".count($row).")";
                continue;
            }

            $data = array_combine($header, $row);
            $data = array_map('trim', $data);

            $validator = Validator::make($data, $rules);

            if ($validator->fails()) {
                $errors[] = "Row {$rowNumber}: " . implode(', ', $validator->errors()->all());
                continue;
            }

            $modelClass::create($data);
            $importedCount++;
        }

        fclose($handle);

        if (count($errors) > 0) {
            return back()->withErrors(['import_errors' => $errors])->with('message', "Imported {$importedCount} records with some errors.");
        }

        return back()->with('message', "Successfully imported {$importedCount} records.");
    }
}
