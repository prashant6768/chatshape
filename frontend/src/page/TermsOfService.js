import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import './BulletPoint.css'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const TermsOfService = () => {

  const gradientC = true

  return (
    <>
     {/* <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      /> */}
      <NavbarC gradientC={gradientC} />
      <div className='pb-5' style={{ backgroundColor: '#242439', height: '100%', minHeight: '100vh', width: '100vw' }}>
        <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Terms Of Service</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>Effective date: 08.01.2023</p>


        <ol className="numbered-list ps-3" style={{ wordBreak:'break-word'}}>
        <li className="list-item my-4">
        {/* <li className="list-item my-4"> */}
            <div className="list-item-content">
              
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Introduction</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>These Terms of Service (“Terms”, “Terms of Service”) are used to determine the rules of the
                Service and to clarify the legal relationship between the entity using the Service and the
                Company. Zema(“Company”) operates web pages located at zema.io and offers Service (as
                defined below in Section 2).The Service is dedicated to the professional entities to help them
                to conduct their business. Using the Website and/or the Service in any manner, also by going
                through the Account registration process, the User or the Guest declares that (i) he/she has
                read, understood and accepts the provisions of the Terms and Privacy Policy, (ii) his/her age
                and legal capacity enables to conclude an agreement with the Company, (iii) he/she has the
                right to act on behalf of the entity which he/she represents and his/her declarations are
                effective. If the User does not agree to apply under the provisions of the Terms, he/she
                should not use the Service. In such a case however, the User may contact the Company by
                emailing at contact@zema.io so the Company can try to find a solution.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>PERSONAL DATA</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                Unless otherwise indicated, the following capitalizes terms have the following meaning:
                Account – means individualized panel serving the User to exploit the Service and/or the
                Website. Agreement – means a subscription agreement that may be concluded between
                User and the Company, that specifies the scope and the price for using the Service. API –
                means Zema application programming interface to be integrated with the User’s software.
                Company – means Zema. Content – means the contents such as texts, pictures and other,
                which the Guest, or the User publishes, presents or sends on the Website or with the use of
                Service. Device – means devices such as a computer, telephone, smartphone, tablet or other
                electronic equipment which allows browsing web pages. Guest – means an entity browsing
                the Website. Intellectual Property – means any designations, inventions, utility models,
                industrial designs, works and other externalized expressions of creative activity that are the
                subject of exclusive rights of the Company. Licence – means a non-exclusive right to personal

                use of the API and/or the Widget. Link – means hyperlink referring to the Other Website.
                Mobile Device – means a portable device such as a telephone, smartphone, tablet or other
                electronic equipment which operates the Website and/or the Service. Notification – means
                message sent to the User as part of the Service. Other Websites – means websites other than
                the Website. Password – means the User’s anonymized verification tool which enables the
                access to the Account and is the sequence of signs possibly to entry by using the keyboard of
                the computer or Mobile Device, which also allows entering text messages in the amount and
                configuration invented by the User however containing at least 8 signs. Privacy Policy –
                means the Privacy Policy, which defines the rules of personal data processing by the
                Company, available under the following internet address: https://zema.io/privacy-policy.
                Service – means together the Website, Widget and/or the API (depending on the scope
                dedicated to a given User pursuant to the Agreement). Terms – means these terms of service
                available under the following address:https://www.zema.io/terms. User – means an entity
                who owns the Account. Website – means web pages located at zema.io. Widget – means a
                Zema widget that may be implemented to the User’s website. Above mentioned definitions
                retain their meaning regardless of whether they are expressed in the singular or the plural.
              </dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>General Rules</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                Using the Service means full acceptance of the Terms. The Terms applies to relations
                between the Company and the Guest or the User only. If the Service and/or the Website
                introduces the possibility of providing services by other entities, they will be provided on the
                basis of regulations shared by these entities and only these entities will be responsible for
                the execution of the services, except the content of the Terms clearly and unambiguously
                indicates otherwise. Each entity using the Service and/or the Website is obliged to use it in
                accordance with its destiny resulting from the Terms. Using the Website is permissible
                provided that the Device meets jointly the following minimum technical requirements:</dd>
              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has access to the Internet,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  allows the start-up of the one from following internet browsers: (i) Google Chrome, (ii)
                  Opera, (iii) Firefox, (iv) Safari, (v) Microsoft Edge,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  the internet browser version used cannot be older than one year,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has JavaScript enabled.
                </li>
              </ul>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF' }}>
                Using the API is possible if the following minimum technical requirements are met:</dd>
              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has access to the Internet,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has software that enables sending HTTP requests.
                </li>
              </ul>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF' }}>
                Using the Widget is possible if the following minimum technical requirements are met:</dd>
              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has access to the Internet,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  allows the start-up of the one from following internet browsers: (i) Google Chrome, (ii)
                  Opera, (iii) Firefox, (iv) Safari, (v) Microsoft Edge,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  the internet browser version used cannot be older than one year,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  has JavaScript enabled.
                </li>
              </ul>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start mt-2' style={{ color: '#FFFFFF' }}>
                It is recommended to install anti-virus software on the Device or on the Mobile Device.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Account</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Account set-up is possible through the Website. Account set-up requires logging in using
                Facebook account, Google account or registering by providing other personal email and
                Password. When you create an Account you should provide us with accurate, complete, and
                current information at all times. Inaccurate, incomplete, or obsolete information may result
                in the immediate termination of your account on the Website and Service. You are
                responsible for maintaining the confidentiality of your Account and Password, including but
                not limited to the restriction of access to your Device or Mobile Device and/or Account. You
                agree to accept responsibility for any and all activities or actions that occur under your
                Account and/or Password, whether your Password is with our Website and Service or a third-
                party service. You must notify us immediately upon becoming aware of any breach of
                security or unauthorized use of your Account. You may not use as a username the name of
                another person or entity or that is not lawfully available for use, a name or trademark that is
                subject to any rights of another person or entity other than you, without appropriate
                authorization. You may not use as a username any name that is offensive, vulgar or obscene.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Communications</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>By creating an Account, you can agree to subscribe to newsletters, marketing or promotional
                materials and other information we may send.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Subscriptions</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Some parts of Service are billed on a subscription basis (“Subscription(s)”). You will be billed
                in advance on a recurring and periodic basis (“Billing Cycle”). Billing cycles are set either on a
                monthly or annual basis, depending on the type of subscription plan you select when
                purchasing a Subscription. At the end of each Billing Cycle, your Subscription will
                automatically renew under the exact same conditions unless you cancel it or the Company
                cancels it. You may cancel your Subscription renewal either through your Account or by
                contacting Company’s customer support team at contact@zema.io. A valid payment method,
                including credit or debit card, Apple Pay or Google Pay, is required to process the payment
                for your subscription. You shall provide the Company with accurate and complete billing
                information including (i) full name, (ii) email address, (iii) country, (iv) business’s legal entity

                name, (v) VAT tax number and (vi) a valid payment method information. By submitting such
                payment information, you automatically authorize Company to charge all Subscription fees
                incurred through your Account to any such payment instruments. Should automatic billing
                fail to occur for any reason, Company will issue an electronic invoice indicating that you must
                proceed manually, within a certain deadline date, with the full payment corresponding to the
                billing period as indicated on the invoice. We reserve the right to refuse or cancel your order
                at any time for reasons including but not limited to: service availability, errors in the
                description or price of the service, error in your order or other reasons. We reserve the right
                to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
                Company is not responsible for any additional fees, including taxes, imposed by the relevant
                authorities of the country in which the person submitting an order resides / is located.
                Payment of these additional fees remains the responsibility of the person submitting the
                order.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Fee Changes</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Company, in its sole discretion and at any time, may modify Subscription fees for the
                Subscriptions. Any Subscription fee change will become effective at the end of the then-
                current Billing Cycle. The Company will provide you with a reasonable prior notice of any
                change in Subscription fees to give you an opportunity to terminate your Subscription before
                such change becomes effective. Your continued use of Service after Subscription fee change
                comes into effect constitutes your agreement to pay the modified Subscription fee amount.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Refunds</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Except when required by law, paid Subscription fees are non-refundable.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Content</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Our Service and Website allows you to post, link, store, share and otherwise make available
                certain information, text, graphics, videos, or other material (“Content”). You are
                responsible, in particular to your customers, for Content that you post on or through Service
                including its legality, reliability, and appropriateness. By posting Content on or through
                Service or Website, You represent and warrant that: (i) Content is yours (you own it) and/or
                you have the right to use it and the right to grant us the rights and license as provided in
                these Terms, and (ii) that the posting of your Content on or through Service does not violate
                the privacy rights, publicity rights, copyrights, contract rights or any other rights of any
                person or entity. We reserve the right to terminate the Account of any User found to be
                infringing on a copyright. You retain any and all of your rights to any Content you submit,
                post or display on or through Service or Website and you are responsible for protecting those
                rights. We take no responsibility and assume no liability for Content you or any third party

                posts on or through Service. However, by posting Content using the Website you grant us the
                right and license to use, modify, publicly perform, publicly display, reproduce, and distribute
                such Content on and through the Website. The Company has the right but not the obligation
                to monitor and edit all Content provided by Users. The Guest and the User assume full
                liability for the Content. In particular the User is obliged to join on the part of Company’s
                proceedings pending on the initiative of third parties in the field of protection of their
                intellectual property rights and to release the Company from all claims of persons authorized
                in this respect.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Prohibited Uses</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>You may use Service or Website only for lawful purposes and in accordance with Terms. You
                agree not to use Service or Website:</dd>
              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  in any way that violates any applicable national or international law or regulation,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  for the purpose of exploiting, harming, or attempting to exploit or harm minors in any
                  way by exposing them to inappropriate content or otherwise,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  to transmit, or procure the sending of, any advertising or promotional material,
                  including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  to impersonate or attempt to impersonate Company, a Company employee, another
                  User, or any other person or entity,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  in any way that infringes upon the rights of others, or in any way is illegal, threatening,
                  fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or
                  harmful purpose or activity,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  to engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of
                  Service or Website, or which, as determined by us, may harm or offend Company or
                  Users of Service or Website or expose them to liability.
                </li>
              </ul>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>You may use Service or Website only for lawful purposes and in accordance with Terms. You
                Additionally, you agree not to:</dd>
              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  use Service and Website in any manner that could disable, overburden, damage, or
                  impair Service or Website or interfere with any other party’s use of Service, including
                  their ability to engage in real time activities through Service or Website,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  use any robot, spider, or other automatic device, process, or means to access Service or
                  Website for any purpose, including monitoring or copying any of the material on
                  Service or Website,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  use any manual process to monitor or copy any of the material on Service or Website or
                  for any other unauthorized purpose without our prior written consent,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  use any device, software, or routine that interferes with the proper working of Service
                  or Website,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  introduce any viruses, trojan horses, worms, logic bombs, or other material, which is
                  malicious or technologically harmful,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of
                  Service or Website, the server on which Service or Website is stored, or any server,
                  computer, or database connected to Service or Website,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  attack Service or Website via a denial-of-service attack or a distributed denial-of-service
                  attack,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  take any action that may damage or falsify Company rating,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  otherwise attempt to interfere with the proper working of Service or Website.
                </li>
              </ul>

            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Analytics</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We may use third-party service providers to monitor and analyze the use of our Service and
                Website. Google Analytics Google Analytics is a web analytics service offered by Google that
                tracks and reports website traffic. Google uses the data collected to track and monitor the
                use of our Service and Website. This data is shared with other Google services. Google may
                use the collected data to contextualize and personalize the ads of its own advertising
                network. For more information on the privacy practices of Google, please visit the Google
                Privacy Terms web page: https://policies.google.com/privacy?hl=en. We also encourage you
                to review the Google&#39;s policy for safeguarding your
                data:https://support.google.com/analytics/answer/6004245.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Intellectual Property</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Service, the Website and their original content (excluding Content), features and
                functionality are and will remain the exclusive property of the Company and its licensors. The
                Service and the Website are protected by copyright, trademark, and other laws of the United
                States and foreign countries. Our trademarks and trade dress may not be used in connection
                with any product or service without the prior written consent of the Company. The Guest
                and the User by using the Service do not acquire any rights to the Intellectual Property. It is
                prohibited to use the Intellectual Property for purposes other than those resulting from the
                authorized personal use referred to in the Article 23 of the Act of February 4, 1994 on
                Copyright and Related Rights. Upon purchase of a Subscription, the User receives the Licence
                to use the Service in accordance with the Subscription. The Licence is limited, non-
                transferable, revocable, non-exclusive and granted for a period consistent with the
                conditions of the Subscription. The User is not entitled to give a sublicense. The Licence is
                granted only in the following forms of exploitation:</dd>

              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  subscribing and installing the Service on the User’s website and/or software,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  using the Service to serve the customers of the User.
                </li>
              </ul>

              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                The User shall not modify, reverse engineer, decompile, disassemble or attempt to derive
                source code from Service or the Website or any portion thereof. The User is not entitled to
                create and/or publish APIs or otherwise proxying access to the Service or the Website nor is

                allowed to use the Service or the Website in an automated manner (that is by machine or
                computer program).
              </dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Copyright Policy</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We respect the intellectual property rights of others. It is our policy to respond to any claim
                that Content posted with the use of the Service or on the Website infringes on the copyright
                or other intellectual property rights (“Infringement”) of any person or entity. If you are a
                copyright owner, or authorized on behalf of one, and you believe that the copyrighted work
                has been copied in a way that constitutes copyright Infringement, please submit your claim
                via email to @dante-ai.co, with the subject line: “Copyright Infringement” and include in
                your claim a detailed description of the alleged Infringement as detailed below, under
                “DMCA Notice and Procedure for Copyright Infringement Claims”. You may be held
                accountable for damages (including costs and attorneys&#39; fees) for misrepresentation or bad-
                faith claims on the infringement of any Content found on and/or through Service or Website
                on your copyright.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>DMCA Notice and Procedure for Copyright Infringement Claims</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by
                providing our Copyright Agent with the following information in writing (see 17 U.S.C
                512(c)(3) for further detail):</dd>

              <ul>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  an electronic or physical signature of the person authorized to act on behalf of the
                  owner of the copyright&#39;s interest,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  a description of the copyrighted work that you claim has been infringed, including the
                  URL (i.e., web page address) of the location where the copyrighted work exists or a
                  copy of the copyrighted work,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  identification of the URL or other specific location on Service where the material that
                  you claim is infringing is located,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  your address, telephone number, and email address,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  a statement by you that you have a good faith belief that the disputed use is not
                  authorized by the copyright owner, its agent, or the law,
                </li>
                <li className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                  a statement by you, made under penalty of perjury, that the above information in your
                  notice is accurate and that you are the copyright owner or authorized to act on the
                  copyright owner&#39;s behalf.
                </li>
              </ul>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>
                You can contact our Copyright Agent via email at support@dante-ai.com.
              </dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Error Reporting and Feedback</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Company tries – to the best of its ability – to support the Guests and Users in solving
                their problems related to functioning of the Service, as well as undertakes actions to improve
                the quality of the Service’s functioning and the provision of the Service based on the
                comments submitted by these entities. You may provide us directly at support@dante-
                ai.com with information and feedback concerning errors, suggestions for improvements,
                ideas, problems, complaints, and other matters related to our Service (“Feedback”). You
                acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual
                property right or other right, title or interest in or to the Feedback; (ii) Company may have
                development ideas similar to the Feedback; (iii) Feedback does not contain confidential
                information or proprietary information from you or any third party; and (iv) Company is not
                under any obligation of confidentiality with respect to the Feedback. In the event the
                transfer of the ownership to the Feedback is not possible due to applicable mandatory laws,
                you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge,
                sub-licensable, unlimited and perpetual right to use (including copy, modify, create
                derivative works, publish, distribute and commercialize) Feedback in any manner and for any
                purpose.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Links to Other Websites</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Our Service and/or Website may contain links to Other Websites that are not owned or
                controlled by the Company. The Company has no control over, and assumes no responsibility
                for the content, privacy policies, or practices of any Other Websites. We do not warrant the
                offerings of any of these entities/individuals or Other Websites. YOU ACKNOWLEDGE AND
                AGREE THAT THE COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR
                INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN
                CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES
                AVAILABLE ON OR THROUGH ANY OTHER WEBSITES. WE STRONGLY ADVISE YOU TO READ
                THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY OTHER WEBSITES THAT YOU VISIT..</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Disclaimer of Warranty</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>THE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS.
                COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR
                IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR
                MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICES,
                THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
                NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY
                OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY,
                QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE
                FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS
                OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED
                THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,

                THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT
                AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE
                SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE
                MEET YOUR NEEDS OR EXPECTATIONS. COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF
                ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT
                NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND
                FITNESS FOR PARTICULAR PURPOSE. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES
                WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Limitation of Liability</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Company shall not be liable for the consequences of complying with the content of tips,
                articles or other publications on the Website or the Service, including the content provided
                by the AI computer. You acknowledge that the AI computer that provides the content in the
                Service and/or the Website is not the expert and may be mistaken and you cannot rely on its
                answers or advice. In particular it cannot replace any professional recommendation. The
                Company shall not be liable to the customers of the User for the use of the Service and the
                Content provided by the Service to the User’s customers.The Company shall not be liable for
                the consequences of installing or sending any malicious software, phishing or any other
                practises undertaken by other entities to the Service. The Company shall not be liable for any
                breaks in the operation of the Service. The Company shall not be liable for the consequences
                of phenomena known as force majeure, including in particular power outages, fires,
                atmospheric phenomena, wars, riots, strikes and other similar events that are not affected
                by the Company. EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
                DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL,
                INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS&#39;
                FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL
                OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED),
                WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR
                ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT
                LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM
                THESE TERMS AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS,
                STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF
                THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY
                FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE
                SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE
                DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
                INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY
                NOT APPLY TO YOU.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>The Guest’s/User’s Liability</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Guest and/or User is fully liable for the consequences of authorized or unauthorized
                distribution of any content available on the Website or the Service. This applies to
                Intellectual Property. The liability includes the Company’s release from any claims in this
                respect if such are against Company. The User is solely liable for any Content published,
                presented, sent or in any other way provided during the use of Service to the User’s
                customers.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Service breaks</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Company does not guarantee the permanent accessibility of the Service or the Website.
                The Company reserves the right to introduce a break in the operation of the Website or the
                Service or their certain functionalities. If there is an intention to implement a break, the
                Company will notify about it by posting relevant information or a massage on the Website or
                via the email provided when setting-up the Account at least 3 days before the date of
                planned break. In the event of unintended breaks in the operation of the Website or the
                Service or their certain functionalities, the Company will immediately notify about it by
                posting a relevant information or message on the Website or via the email provided when
                setting-up the Account. Acceptance of the Regulations means also giving an approval for the
                Services being not 100% reliable.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Personal Data Protection and Security</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>The Company processes personal data with due diligence and ensuring adequate technical
                and organizational security measures. Detailed information about the protection of personal
                data can be found in the Privacy Policy. The Company shall not be liable for the personal data
                protection of the User’s customers that use the Service. The Company shall not be liable for
                the contents and rules of personal data protection and privacy on the Other Websites,
                including those to which the Links refer. The Company shall not be liable for the damages
                caused by browsing the Other Websites or posting any personal data or other information on
                them. The Company recommends reading the rules of personal data protection and privacy
                on the Other Websites, including those to which the Links refer, before starting using them,
                in particular before publishing own personal data or other essential information on the Other
                Websites.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Termination</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We may terminate or suspend your Account and ban access to Service immediately, without
                prior notice or liability, under our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of Terms. If you wish to terminate your
                Account, you may simply discontinue using Service. All provisions of Terms which, by their

                nature, should survive termination shall survive termination, including, without limitation,
                ownership provisions, warranty disclaimers, indemnity and limitations of liability.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Governing Law</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>These Terms shall be governed and construed in accordance with the laws of State of
                California without regard to its conflict of law provisions. Our failure to enforce any right or
                provision of these Terms will not be considered a waiver of those rights. If any provision of
                these Terms is held to be invalid or unenforceable by a court, the remaining provisions of
                these Terms will remain in effect. These Terms constitute the entire agreement between us
                regarding our Service and supersede and replace any prior agreements we might have had
                between us regarding Service.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Changes To Service</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We reserve the right to withdraw or amend our Service, and any service or material we
                provide via Service, in our sole discretion without notice. We will not be liable if for any
                reason all or any part of Service is unavailable at any time or for any period. From time to
                time, we may restrict access to some parts of Service, or the entire Service, to users,
                including registered users.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Amendments To Terms</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>We may amend Terms at any time by posting the amended terms on this site. It is your
                responsibility to review these Terms periodically. Your continued use of the Platform
                following the posting of revised Terms means that you accept and agree to the changes. You
                are expected to check this page frequently, so you are aware of any changes, as they are
                binding on you. By continuing to access or use our Service after any revisions become
                effective, you agree to be bound by the revised terms. If you do not agree to the new terms,
                you are no longer authorized to use Service. In case of any discrepancies between these
                Terms and the Agreement (if concluded), the provisions of the Agreement shall be
                applicable. The sentence refers also to the amendments of these Terms introduced in the
                Agreement.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Waiver And Severability</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>No waiver by Company of any term or condition set forth in Terms shall be deemed a further
                or continuing waiver of such term or condition or a waiver of any other term or condition,
                and any failure of Company to assert a right or provision under Terms shall not constitute a
                waiver of such right or provision. If any provision of Terms is held by a court or other tribunal

                of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such
                provision shall be eliminated or limited to the minimum extent</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Acknowledgement</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU
                HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.</dd>
            </div>
          </li>

          <li className="list-item my-4">
            <div className="list-item-content">
              <dt className='fs-4 col-12 d-flex justify-content-start container text-start mx-1' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Contact Us</dt>
              <dd className='fs-4 col-12 d-flex justify-content-start container text-start ' style={{ color: '#FFFFFF' }}>Any time you wish to contact the Company, please send email at: contact@zema.io</dd>
            </div>
          </li>



        </ol>

      </div>
      <Footer />
    </>
  )
}

export default TermsOfService