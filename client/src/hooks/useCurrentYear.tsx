const useCurrentYear = () => {
  const currentYear: number = new Date().getFullYear();
  return currentYear;
};

export default useCurrentYear;
