interface DashboardProps {
    children: React.ReactNode;
}
const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow p-4">
                {children}
            </main>
        </div>
    );
}
export default Dashboard;
// This component is a layout for the dashboard, including a header, main content area, and footer.