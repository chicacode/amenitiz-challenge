interface DashboardProps {
    children: React.ReactNode;
}
const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-blue-500">
            <main className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl text-black font-bold">Chess.com Wikipedia page</h1>
                </div>
                {children}
            </main>
        </div>
    );
}
export default Dashboard;
// This component is a layout for the dashboard, including a header, main content area, and footer.