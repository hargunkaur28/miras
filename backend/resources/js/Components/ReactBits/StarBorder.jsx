const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  children,
  ...rest
}) => {
  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="star-border-border"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${color} 25%, transparent 50%, ${color} 75%, transparent 100%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="star-border-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
