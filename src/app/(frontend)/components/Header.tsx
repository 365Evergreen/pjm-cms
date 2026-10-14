import styles from './Header.module.css'
export default function Header() {
    return (

        <header className={styles.header}>
            <div className={styles.headerContent}>
                {/*  <!-- Brand Logo --> */}
                <div className="logo">
                    <a href="/" aria-label="Company Home">
                        <img src="logo.svg" alt="Company Logo" />
                    </a>
                </div>

                {/*  <!-- Navigation Menu --> */}
                <nav className="main-nav" aria-label="Primary Navigation">
                    <ul className="nav-list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>

                {/*     <!-- Action Button -->*/}
                <div className="header-actions">
                    <a href="/get-started" className="btn-cta">Get Started</a>
                </div>
            </div>
        </header>
    )
}