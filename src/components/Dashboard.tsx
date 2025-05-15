interface DashboardProps {
    children: React.ReactNode;
}
const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div className="w-full mx-auto flex flex-col min-h-screen bg-blue-400">
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-6">
                {children}
                </div>
            </main>
        </div>
    );
}
export default Dashboard;
// This component is a layout for the dashboard, including a header, main content area, and footer.