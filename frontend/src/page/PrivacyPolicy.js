import React from 'react'
import NavbarC from '../component/NavbarC'
import Footer from '../component/Footer'
import './BulletPoint.css'
import ScriptLoaderHOC from '../component/ScriptLoaderHOC';

const PrivacyPolicy = () => {

  const gradientC = true

  return (
    <>
     {/* <ScriptLoaderHOC
        scriptUrl="https://cdn.jsdelivr.net/gh/Aniket-Shival/popup@Aniket-Shival-mic-3/popup.js"
        id="popup"
        cred="64d47c3004d7aebaeb5dbf04"
      /> */}
      <NavbarC gradientC={gradientC} />
      <div className='pb-5' style={{ backgroundColor: '#242439', height: '100%', minHeight: '100vh', width: '100vw', wordBreak:'break-word' }}>
         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Privacy Policy</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>Effective date: 08.01.2023</p>
        {/* <p className='fs-4 col-12 d-flex justify-content-start container text-center pb-2 pt-3' style={{ color: '#FFFFFF' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur obcaecati, deserunt corrupti sequi natus iusto voluptatum saepe repudiandae nihil? Tempore eveniet cumque ad modi eaque! Voluptate quasi officia est sint natus laboriosam, consectetur incidunt nihil debitis quos fugit aperiam quaerat placeat saepe? Amet quibusdam tempora deserunt. Similique illum autem dicta molestiae minus reiciendis amet dolorum voluptas accusamus nemo! Facilis aut, reprehenderit, nam quasi, eius ipsam harum dolorem et quis libero vero nostrum voluptatibus tempora provident aperiam repudiandae officia optio suscipit repellendus aspernatur cumque. Aspernatur reiciendis enim, ipsum magni ex adipisci corporis, nisi delectus, repudiandae iure quas vel voluptatum ducimus hic.</p> */}
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-2 pt-3' style={{ color: '#FFFFFF' }}>
          Our Commitment to User Privacy
          Protecting your privacy is our top priority. We do not show ads or sell data.
          All data we collect from you is acquired for internal business uses only and for the
          purpose of providing our Service to you. We operate and maintain a variety of online
          security measures to safeguard your privacy and keep any data we receive private.
        </p>
         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Introduction</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Welcome to ZEMA.<br></br>
          Zema.io Website located at https://zema.io, Zema Tools and Widgets, Zema
          Browser Extensions (hereinafter altogether referred to as “Service”), are
          operated by Zema Technologies a DBA under Florida Company Registrations
          (“us”, “we”, or “our”), registered at 8350 Bee Ridge Road, Sarasota FL 34241.<br></br>
          Our Privacy Policy governs your visit to https://zema.io and usage of Service
          and explains how we collect, safeguard and disclose information that results
          from your use of our Service.<br></br>
          We use your data to provide and improve Service. By using Service, you agree
          to the collection and use of information in accordance with this policy. Unless
          otherwise defined in this Privacy Policy, the terms used in this Privacy Policy
          have the same meaning as in our Terms and Conditions.<br></br>

          Our Terms and Conditions (“Terms”) govern all use of our Service and
          together with the Privacy Policy constitutes your agreement with us
          (“Agreement”).
        </p>

        <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Definitions</h1>
        
      <dl>
  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>SERVICE</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>means the https://zema.io website.</dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>PERSONAL DATA</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    means data about a living individual who can be identified
    from those data (or from those and other information either in our possession
    or likely to come into our possession).
  </dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>USAGE DATA</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    is data collected automatically either generated by the use of
    Service or from Service infrastructure itself (for example, the duration of a
    page visit).
  </dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>COOKIES</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>are small files stored on your device (computer or mobile device).</dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>DATA CONTROLLER</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which
    and the way any personal data is, or are to be, processed. To this Privacy
    Policy, we are a Data Controller of your data.
  </dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>DATA PROCESSORS (OR SERVICE PROVIDERS)</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    mean any natural or legal person who processes the data on behalf of the Data Controller. We may use
    the services of various Service Providers in order to process your data more effectively.
  </dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>DATA SUBJECT</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    is any living individual who is the subject of Personal Data.
  </dd>

  <dt className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF', fontWeight: 'bold' }}>THE USER</dt>
  <dd className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
    is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.
  </dd>
</dl>



         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Information Collection and Use</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We collect several different types of information for various purposes to
          provide and improve our Service to you.
        </p>
       
         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Types of Data Collected</h1>
        <div >
         <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}> We gather three types of information:</p><br></br>
<ul>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> Personally identifiable information (“Personal Data”) that is supplied
          voluntarily upon registration for Services, ordering products from
          Services or subscribing to our marketing materials, and</li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>Aggregate tracking and site usage information that is gathered
          automatically when you use the Service.</li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>Cookies.</li>
          </ul>
         <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}> It is our policy to use the personally identifiable information acquired at our
          websites and applications for internal business uses only and for the purpose
          of providing the Service. We operate and maintains a variety of online security
          measures to safeguard and keep personal data private:<br></br></p>
          <ul>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>We encrypt all client-server and server-server communications.<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>We store data in our database in encrypted form, including storing user
          account password in salted hash format.<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>We implement access control procedures to ensure only authorized
          personnel have access to sensitive data.<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>We only collect and store the data that is necessary for Zema to
          function, we limit the amount of personal data we store<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>We automatically delete personal data when it is no longer needed
          (e.g. when you delete your account with us)<br></br></li></ul>
         <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>We do not collect your web browser data including but not limited to
          browsing history, 3rd party website data and passwords. We do not collect
          any data that is not required to provide our Service to Users.<br></br>
          We only collect sensitive personal information and personally identifiable
          information when you voluntarily provide us with this information or where

          such information is required or permitted to be collected by law or

          professional

          standards.<br></br></p> 
        </div>

        <h3 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Personal Data</h3>
        <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>
          Personally identifiable information includes:<br></br></p>
          <ul>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Email address<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>First name and last name<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Phone number<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Address, State, Province, ZIP/Postal code, City<br></br></li>
          </ul>
          <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may use your Personal Data to contact you with newsletters, marketing or
          promotional materials and other information that may be of interest to you.<br></br>

          You may opt out of receiving any, or all, of these communications from us by
          following the unsubscribe link.<br></br></p>
        
        </div>

        <h3 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}> Usage Data</h3>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may also collect information that your browser sends whenever you visit
          our Service or when you access Service by or through a mobile device
          (“Usage Data”).<br></br>
          This Usage Data may include information such as your computer’s Internet
          Protocol address (e.g. IP address), browser type, browser version, the pages of
          our Service that you visit, the time and date of your visit, the time spent on
          those pages, unique device identifiers and other diagnostic data.<br></br>
          When you access Service with a mobile device, this Usage Data may include
          information such as the type of mobile device you use, your mobile device
          unique ID, the IP address of your mobile device, your mobile operating system,
          the type of mobile Internet browser you use, unique device identifiers and
          other diagnostic data.<br></br>
        </p>

        <h3 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Cookies Data</h3>
       <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
          We use cookies to track the activity on our Service.<br></br>
          Cookies are files with a small amount of data which may include an
          anonymous unique identifier. Cookies are sent to your browser from a website
          and stored on your device. Other tracking technologies are also used such as
          beacons, tags and scripts to collect and track information and to improve
          and analyze our Service.<br></br>
          You can instruct your browser to refuse all cookies or to indicate when a
          cookie is being sent. However, if you do not accept cookies, you may not be
          able to use some portions of our Service.<br></br>
          Examples of Cookies we use:<br></br></p>
      <ul>
      <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Session Cookies: We use Session Cookies to operate our Service.<br></br></li>
      <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Preference Cookies: We use Preference Cookies to remember your
          preferences and various settings.<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> Security Cookies: We use Security Cookies for security purposes.<br></br></li>
          </ul>
        
        </div>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Use of Data</h1>
         <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>
          {/* <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}> */}
          Zema uses the collected data for the following purposes:<br></br></p>
          <ul>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to provide and maintain our Service;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to notify you about changes to our Service;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to provide customer support;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to gather analysis or valuable information so that we can improve our
          Service;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to monitor the usage of our Service;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to detect, prevent and address technical issues;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to fulfill any other purpose for which you provide it;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to carry out our obligations and enforce our rights arising from any
          contracts entered into between you and us, including for billing;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to provide you with notices about your account and/or subscription,
          including expiration and renewal notices, email-instructions, etc.;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> to provide you with news, special offers and general information about
          other goods, services and events which we offer that are similar to
          those that you have already purchased or enquired about unless you
          have opted not to receive such information;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> in other ways we may describe when you provide the information;</li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}> for other purposes with your consent.<br></br></li>
          </ul>
        </div>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Retention of Data</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We will retain your Personal Data only for as long as is necessary for the
          purposes set out in this Privacy Policy. We will retain and use your Personal
          Data to the extent necessary to comply with our legal obligations (for
          example, if we are required to retain your data to comply with applicable
          laws), resolve disputes, and enforce our legal agreements and policies.<br></br>
          We will also retain Usage Data for internal analysis purposes. Usage Data is
          generally retained for a shorter period, except when this data is used to
          strengthen the security or to improve the functionality of our Service, or we
          are legally obligated to retain this data for longer time periods.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Transfer of Data</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Your information, including Personal Data, may be transferred to – and
          maintained on – computers located outside of your state, province, country
          or other governmental jurisdiction where the data protection laws may differ
          from those of your jurisdiction.<br></br>
          If you are located outside of North America and choose to provide
          information to us, please note that we transfer the data, including Personal
          Data, to North America and process it there.<br></br>
          Your consent to this Privacy Policy followed by your submission of such
          information represents your agreement to that transfer.<br></br>
          Zema will take all the steps reasonably necessary to ensure that your data is
          treated securely and in accordance with this Privacy Policy and no transfer of
          your Personal Data will take place to an organization or a country unless there
          are adequate controls in place including the security of your data and other
          personal information.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Disclosure of Data</h1>
       <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>
          We may disclose personal information that we collect, or you provide:<br></br></p>
<ul>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Disclosure for Law Enforcement. Under certain circumstances, we may
          be required to disclose your Personal Data if required to do so by law or
          in response to valid requests by public authorities.<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>Business Transaction. If we or our subsidiaries are involved in a merger,
          acquisition or asset sale, your Personal Data may be transferred.<br></br></li></ul>
          <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>
          We may disclose your information also:<br></br></p>
          <ul>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>to our subsidiaries and affiliates;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>to contractors, service providers, and other third parties we use to
          support our business;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>if we believe disclosure is necessary or appropriate to protect the rights,
          property, or safety of the Company, our customers, or others;<br></br></li>
           <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>with your consent in any other cases.<br></br></li>
           </ul>
        </div>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Security of Data</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          The security of your data is important to us but remember that no method of
          transmission over the Internet or method of electronic storage is 100% secure.
          While we strive to use commercially acceptable means to protect your
          Personal Data, we cannot guarantee its absolute security.
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Your Data Protection Rights Under
          General Data Protection Regulation
          (GDPR)</h1>
          <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pt-3' style={{ color: '#FFFFFF' }}>
          If you are a resident of the European Union (EU) and European Economic Area
          (EEA), you have certain data protection rights, covered by GDPR. See more at
          https://eur-lex.europa.eu/eli/reg/2016/679/oj<br></br>
          We aim to take reasonable steps to allow you to correct, amend, delete, or
          limit the use of your Personal Data.<br></br>

          If you wish to be informed what Personal Data we hold about you and if you
          want it to be removed from our systems, please email us at contact@zema.io.<br></br>
          In certain circumstances, you have the following data protection rights:<br></br></p>
          <ul>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right to access, update or to delete the information we have on you;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right of rectification. You have the right to have your information
          rectified if that information is inaccurate or incomplete;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right to object. You have the right to object to our processing of your
          Personal Data;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right of restriction. You have the right to request that we restrict the
          processing of your personal information;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right to data portability. You have the right to be provided with a
          copy of your Personal Data in a structured, machine-readable and
          commonly used format;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>the right to withdraw consent. You also have the right to withdraw your
          consent at any time where we rely on your consent to process your
          personal information;<br></br></li>
          </ul>
          <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Please note that we may ask you to verify your identity before responding to
          such requests. Please note, we may not able to provide Service without some
          necessary data.<br></br>
          You have the right to complain to a Data Protection Authority about our
          collection and use of your Personal Data. For more information, please
          contact your local data protection authority in the European Economic Area
          (EEA).<br></br></p>
        </div>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Your Data Protection Rights under
          the California Privacy Protection Act
          (CalOPPA)</h1>
          <div>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3' style={{ color: '#FFFFFF' }}>
          CalOPPA is the first state law in the United States to require commercial
          websites and online services to post a privacy policy. The law’s reach
          stretches well beyond California to require a person or company in the United
          States (and conceivable the world) that operates websites collecting
          personally identifiable information from California consumers to post a
          conspicuous privacy policy on its website stating exactly the information
          being collected and those individuals with whom it is being shared, and to
          comply with this policy. See more at: https://consumercal.org/about-cfc/cfc-
          education-foundation/california-online-privacy-protection-act-caloppa-3/<br></br>
          According to CalOPPA we agree to the following:<br></br></p>
          <ul>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>users can visit our site anonymously;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>our Privacy Policy link includes the word “Privacy”, and can easily be
          found on the page specified above on the home page of our website;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>users will be notified of any privacy policy changes on our Privacy Policy
          Page;<br></br></li>
          <li className='fs-4 col-12 d-flex justify-content-start container text-start  pt-3 text-de' style={{ color: '#FFFFFF' }}>users are able to change their personal information by emailing us
          at contact@zema.io.<br></br></li>
          </ul>
          <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Our Policy on “Do Not Track” Signals:<br></br>
          We honor Do Not Track signals and do not track, plant cookies, or use
          advertising when a Do Not Track browser mechanism is in place. Do Not Track
          is a preference you can set in your web browser to inform websites that you
          do not want to be tracked.<br></br>
          You can enable or disable Do Not Track by visiting the Preferences or Settings
          page of your web browser.<br></br>
        </p>
        </div>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Service Providers</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may employ third party companies and individuals to facilitate our
          Service (“Service Providers”), provide Service on our behalf, perform Service-
          related services, or assist us in analyzing how our Service is used.<br></br>
          These third parties have access to your Personal Data only to perform these
          tasks on our behalf and are obligated not to disclose or use it for any other
          purpose.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Analytics</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may use third-party Service Providers to monitor and analyze the use of
          our Service.<br></br>
          Google Analytics<br></br>
          Google Analytics is a web analytics service offered by Google that tracks and
          reports website traffic. Google uses the data collected to track and monitor
          the use of our Service. This data is shared with other Google services. Google
          may use the collected data to contextualize and personalize the ads of its
          own advertising network.<br></br>
          For more information on the privacy practices of Google, please visit the
          Google Privacy Terms web page: https://policies.google.com/privacy?hl=en<br></br>
          We also encourage you to review the Google’s policy for safeguarding your
          data: https://support.google.com/analytics/answer/6004245.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Payments</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may provide paid products and/or services within Service. In that case, we
          use third-party services for payment processing (e.g. payment processors).<br></br>
          We will not store or collect your payment card details. That information is
          provided directly to our third-party payment processors whose use of your
          personal information is governed by their Privacy Policy. These payment
          processors adhere to the standards set by PCI-DSS as managed by the PCI
          Security Standards Council, which is a joint effort of brands like Visa,

          Mastercard, American Express and Discover. PCI-DSS requirements help
          ensure the secure handling of payment information.<br></br>
          The payment processors we work with are:<br></br>
          Stripe:<br></br>
          Their Privacy Policy can be viewed at https://stripe.com/privacy<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Links to Other Sites</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Our Service may contain links to other sites that are not operated by us. If you
          click a third party link, you will be directed to that third party’s site. We strongly
          advise you to review the Privacy Policy of every site you visit.<br></br>
          We have no control over and assume no responsibility for the content, privacy
          policies or practices of any third party sites or services.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Children’s Privacy</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Our Services are not intended for use by children under the age of 18
          (“Children”).<br></br>
          We do not knowingly collect personally identifiable information from Children
          under 18. If you become aware that a Child has provided us with Personal
          Data, please contact us. If we become aware that we have collected Personal
          Data from Children without verification of parental consent, we take steps to
          remove that information from our servers.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Changes to This Privacy Policy</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          We may update our Privacy Policy from time to time. We will notify you of any
          changes by posting the new Privacy Policy on this page.<br></br>
          We will let you know via email and/or a prominent notice on our Service, prior
          to the change becoming effective and update “effective date” at the top of
          this Privacy Policy.<br></br>

          You are advised to review this Privacy Policy periodically for any changes.
          Changes to this Privacy Policy are effective when they are posted on this
          page.<br></br>
        </p>

         <h1 className='fw-bolder col-12 d-flex justify-content-start container text-start pb-2 pt-5' style={{ color: '#FFFFFF' }}>Contact Us</h1>
        <p className='fs-4 col-12 d-flex justify-content-start container text-start pb-5 pt-3' style={{ color: '#FFFFFF' }}>
          Please send your feedback, comments, requests for technical support by
          email: contact@zema.io or by visiting this page on our website:
          https://zema.io/contact-us
        </p>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy