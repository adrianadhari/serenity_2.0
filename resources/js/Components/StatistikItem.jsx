export default function StatistikItem({ children, title, number, bgColour }) {
    return (
        <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
            <div className={`p-3 mr-4 ${bgColour} rounded-full`}>
                {children}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-lg font-semibold text-gray-700">{number}</p>
            </div>
        </div>
    );
}
