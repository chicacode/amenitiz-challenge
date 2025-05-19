const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-blue-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;