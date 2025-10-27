import "./landing.css";
import Hero from "./hero.png";
import Image from "./image.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
    function create(){
        document.querySelector("#creates").click();
    }
    return(
        <div id="landing">
            <header>
                <h2>Ticketly</h2>
                <nav>
                    <button onClick={create}>Login</button>
                    <button onClick={create}>Get Started</button>
                </nav>
            </header>

            <main>
                <div>
                    <aside></aside>
                    <h1>Manage Your Ticket with Ease</h1>
                    <p>Track, update, and resolve issues faster.</p>
                    <nav>
                        <button onClick={create}>Get Started</button>
                        <button onClick={create}>Login Now</button>
                    </nav>
                </div>
                <img src={Hero} alt="" />
            </main>

            <h1>How it works</h1>
            <section>
                <article>
                    <i class="fa-solid fa-square-plus"></i>
                    <h4>Create Tickets</h4>
                    <p>Quickly open new support or task tickets with essential details. Stay organized and never lose track of what needs attention.</p>
                </article>
                <article>
                    <i class="fa-solid fa-bars-progress"></i>
                    <h4>Track Progress</h4>
                    <p>Monitor every ticket in real time from open to in-progress to resolved. Stay informed with clear status updates.</p>
                </article>
                <article>
                    <i class="fa-brands fa-resolving"></i>
                    <h4>Resolve Easily</h4>
                    <p>Close issues faster with intuitive tools that simplify communication and resolution. Boost team efficiency effortlessly.</p>
                </article>
            </section>
            <h1>What our client say</h1>
            <summary>
                <section>
                    <img src={Image} alt="image" />
                    <h4>Sarah M.</h4>
                    <p>Using this ticket app has changed the way our team works. It’s fast, clean, and easy to navigate — we resolve issues in half the time now!</p>
                    <li>Operations Manager</li>
                </section>
                <section>
                    <img src={Image} alt="image" />
                    <h4>Daniel K.</h4>
                    <p>I can finally track every ticket without stress. The dashboard is super clear, and I love how updates happen instantly</p>
                    <li>Customer Support Lead</li>
                </section>
                <section>
                    <img src={Image} alt="image" />
                    <h4>Amina O</h4>
                    <p>Everything just feels smooth — from creating tickets to closing them. It keeps our workflow organized and our team on the same page.</p>
                    <li>Product Designer</li>
                </section>
            </summary>

            <footer>
                <p>&copy; copyright 2025 Ticketly</p>
                <p>Privacy Policy</p>
                <p>Terms</p>
            </footer>
            <p>Code with Love and Peace by AbdulMalik</p>
            <Link to="/signup" id="creates"></Link>
        </div>
    )
}
export default LandingPage;