import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import styles from './style.module.css';

const NotFoundPage: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Error Page</title>
            </Helmet>
            <div className={styles['container']}>
                <div>
                    <div className={styles['starsec']}></div>
                    <div className={styles['starthird']}></div>
                    <div className={styles['starfourth']}></div>
                    <div className={styles['starfifth']}></div>
                </div>

                <div className={styles['lamp__wrap']}>
                    <div className={styles['lamp']}>
                        <div className={styles['cable']}></div>
                        <div className={styles['cover']}></div>
                        <div className={styles['in-cover']}>
                            <div className={styles['bulb']}></div>
                        </div>
                        <div className={styles['light']}></div>
                    </div>
                </div>
                <section className={styles['error']}>
                    <div className={styles['error__content']}>
                        <div className={styles['error__message message']}>
                            <h1 className={styles['message__title']}>UH OH! You're lost.</h1>
                            <p className={styles['message__text']}>
                                How you got here is a mystery. But you can click the button below to go back to the
                                homepage.
                            </p>
                        </div>
                        <div className={styles['error__nav e-nav']}>
                            <Link to="/" className={styles['e-nav__link']}></Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default NotFoundPage;
