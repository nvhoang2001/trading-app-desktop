import { Helmet } from 'react-helmet';

const Homepage: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div>
                <h1>Dashboard</h1>
            </div>
        </div>
    );
};

export default Homepage;
