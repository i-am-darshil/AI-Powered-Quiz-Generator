import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
// import Provider from "@components/Provider";
import Provider from "@context/UserContext";

export const metadata = {
  title: "SuperQuizzer",
  description: "Stop Wasting Time Manually Creating & Grading Quizzes",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />

            {children}
            {/* <Footer /> */}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
