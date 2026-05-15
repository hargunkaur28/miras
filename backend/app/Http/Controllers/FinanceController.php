<?php
namespace App\Http\Controllers;
use App\Models\FinanceEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\CsvImportable;

class FinanceController extends Controller {
    use CsvImportable;
    public function index() {
        $entries = FinanceEntry::latest()->paginate(20);
        $income = FinanceEntry::where('type', 'income')->sum('amount');
        $expense = FinanceEntry::where('type', 'expense')->sum('amount');
        return Inertia::render('Finance/Index', ['entries' => $entries, 'income' => $income, 'expense' => $expense]);
    }
    public function create() {
        return Inertia::render('Finance/Create');
    }
    public function store(Request $request) {
        $v = $request->validate([
            'type' => 'required|in:income,expense',
            'category' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'entry_date' => 'required|date',
        ]);
        FinanceEntry::create($v);
        return redirect()->route('finance.index')->with('message', 'Finance entry created.');
    }
    public function edit(FinanceEntry $finance) {
        return Inertia::render('Finance/Edit', ['entry' => $finance]);
    }
    public function update(Request $request, FinanceEntry $finance) {
        $v = $request->validate([
            'type' => 'required|in:income,expense',
            'category' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'entry_date' => 'required|date',
        ]);
        $finance->update($v);
        return redirect()->route('finance.index')->with('message', 'Finance entry updated.');
    }
    public function destroy(FinanceEntry $finance) {
        $finance->delete();
        return redirect()->route('finance.index')->with('message', 'Finance entry deleted.');
    }
    public function import(Request $request) {
        return $this->importCsv($request, FinanceEntry::class, [
            'type' => 'required|in:income,expense',
            'category' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'entry_date' => 'required|date',
        ]);
    }
}
