interface SearchBarProps{
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="flex items-center">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search grandmaster..."
                className="w-full px-4 py-2 mb-4 border bg-transparent border-gray-300 placeholder:text-slate-400 text-slate-700 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
        </div>
    );
};

export default SearchBar;
