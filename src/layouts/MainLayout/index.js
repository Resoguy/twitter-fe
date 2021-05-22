import React from 'react';
import s from './MainLayout.module.scss';


const MainLayout = ({children}) => {

    return (
        <div className={s.container}>
                <section className={s.leftContent}>
                </section>

                <main className={s.mainContent}>
                    {children}
                </main>

                <aside className={s.rightContent}>
                    <h1>Users</h1>
                </aside>
            </div>
    )
}

export default MainLayout;
