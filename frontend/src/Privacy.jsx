import React from 'react'
import "./Privacy.css"
export const Privacy = () => {
 const lastUpdated = 'October 19, 2025'; 

  return (
    <div className="myob-privacy-root min-h-screen py-12">
      <div className="myob-privacy-card">
        <header>
          <h1 className="myob-heading">Privacy Policy — MyOceanBasket</h1>
          <p className="myob-sub">Last Updated: {lastUpdated} • An online fish delivery platform connecting customers and local fish shops.</p>
        </header>

        <main className="mt-6 space-y-6 text-sm leading-7 text-slate-700">

          <section className="myob-section">
            <h3>1. About MyOceanBasket</h3>
            <p>
              <strong>MyOceanBasket</strong> ("we", "our", "us") is an online platform that connects customers with
              local fish shops so they can browse, order, and receive fresh fish delivered to their doorstep.
              We are committed to protecting your privacy and use the data we collect to provide and improve our services.
            </p>
          </section>

          <section className="myob-section">
            <h3>2. Information We Collect</h3>
            <p>We collect information you provide directly and information collected automatically when you use the service.</p>

            <div className="mt-3">
              <h4 className="font-medium">a. Personal Information</h4>
              <ul className="myob-list list-disc">
                <li>Full name, phone number, email address, and delivery address.</li>
                <li>Login credentials such as username and password (stored securely).</li>
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-medium">b. Transactional Information</h4>
              <ul className="myob-list list-disc">
                <li>Order details (items purchased, quantities, prices), payment status and receipts, payment gateway transaction IDs.</li>
                <li>We do <em>not</em> store raw card or full banking details — those are handled by our payment processors.</li>
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-medium">c. Technical & Usage Information</h4>
              <ul className="myob-list list-disc">
                <li>IP address, browser type & version, device information, pages visited and interaction data, and cookies.</li>
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-medium">d. Shop Owner Information</h4>
              <ul className="myob-list list-disc">
                <li>Shop name & address, license details (if provided), bank details for payouts, and contact information.</li>
              </ul>
            </div>
          </section>

          <section className="myob-section">
            <h3>3. How We Use Your Information</h3>
            <p>We use personal data for the following purposes:</p>
            <ul className="myob-list list-disc">
              <li>Create and manage your user or shop account.</li>
              <li>Process and fulfill orders; share necessary details with the relevant shop and delivery partner.</li>
              <li>Facilitate payments through secure payment gateways.</li>
              <li>Send order confirmations, delivery updates, and important notices.</li>
              <li>Improve and personalize the website and customer experience, and to perform analytics.</li>
              <li>Comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section className="myob-section">
            <h3>4. Sharing Your Information</h3>
            <p>We do not sell or rent your personal information. We may share data with:</p>
            <ul className="myob-list list-disc">
              <li>Registered shop owners to fulfill orders (delivery address, order items).</li>
              <li>Delivery partners to coordinate and complete deliveries.</li>
              <li>Payment processors (for transaction processing).</li>
              <li>Law enforcement or other authorities when required by law.</li>
            </ul>
          </section>

          <section className="myob-section">
            <h3>5. Cookies & Tracking</h3>
            <p>
              We use cookies and similar technologies to remember preferences, authenticate users, and analyze site traffic.
              You can control cookies through your browser settings; however, disabling cookies may affect site functionality.
            </p>
          </section>

          <section className="myob-section">
            <h3>6. Data Security</h3>
            <p>
              We implement technical and organizational safeguards to protect data: HTTPS, secure servers, access controls, and
              regular security reviews. While we strive to protect your information, no system is perfectly secure.
            </p>
          </section>

          <section className="myob-section">
            <h3>7. Data Retention</h3>
            <p>
              We retain personal data only as long as necessary to provide our services, comply with legal obligations,
              resolve disputes, and enforce our agreements. When data is no longer required, we securely delete or anonymize it.
            </p>
          </section>

          <section className="myob-section">
            <h3>8. Your Rights</h3>
            <p>
              Depending on applicable law, you may have the right to access, correct, or delete your personal information,
              and to object to or restrict certain processing. To exercise your rights, contact us at the email below.
            </p>
          </section>

          <section className="myob-section">
            <h3>9. Third-Party Links</h3>
            <p>
              Our site may contain links to third-party services (such as payment providers). We are not responsible for their
              privacy practices — please review their policies before sharing personal data.
            </p>
          </section>

          <section className="myob-section">
            <h3>10. Children’s Privacy</h3>
            <p>
              Our services are not intended for individuals under 18. If we learn that a minor's personal information was
              collected without parental consent, we will promptly delete that information.
            </p>
          </section>

          <section className="myob-section">
            <h3>11. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy periodically. When we make changes, we will post the updated policy on this page
              with an updated "Last Updated" date. Continued use of the service after changes indicates acceptance of the new policy.
            </p>
          </section>

          <section className="myob-section">
            <h3>12. Contact Us</h3>
            <p className="myob-contact">If you have questions or wish to exercise your rights, contact us:</p>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-sm">MyOceanBasket</div>
                <a className="inline-block mt-1 text-teal-600 hover:underline" href="mailto:yourbusiness@email.com">yourbusiness@email.com</a>
                <div className="text-xs text-slate-500 mt-1">Address: [Your Business Address]</div>
              </div>

              <div className="text-xs text-slate-500">Website: <a className="font-medium text-teal-600" href="https://www.myoceanbasket.in">www.myoceanbasket.in</a></div>
            </div>
          </section>

        </main>

        <footer className="myob-footer">
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} MyOceanBasket. All rights reserved.</div>
          <div className="text-sm myob-contact">Questions? <a href="">Contact us</a></div>
        </footer>
      </div>
    </div>
  );
}
