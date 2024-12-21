type LabelProps = {
  label: string;
};
const Label = ({ label }: LabelProps): JSX.Element => {
  return (
    <label htmlFor={label} className="block text-sm text-white font-medium">
      {label}
    </label>
  );
};

export default Label;
