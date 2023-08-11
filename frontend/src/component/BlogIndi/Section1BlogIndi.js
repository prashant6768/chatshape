import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dental from '../../assets/dentalBlog.PNG'
import businessAi from '../../assets/businessAi.PNG'
import aibuss from '../../assets/aibuss.jpg'
import ReactHtmlParser from 'react-html-parser';
import '../BlogIndi/blogIndi.css'


const Section1BlogIndi = () => {

  const { id } = useParams()

  const dataArray = [
    {
      id: 1,
      imageHeading: 'How to Customize ChatGPT with your data',
      imageSubheading: 'Tim Smith',
      company: 'Zema',
      imageSource: 'https://beebom.com/wp-content/uploads/2022/12/cool-things-do-with-chatgpt-featured.jpg?w=750&quality=75',
      blogContent: `
          <h1>How to Customize ChatGPT with your Data</h1>
          <p class='para' >In the rapidly evolving landscape of artificial intelligence, one of the most remarkable advancements is the creation of ChatGPT. This AI language model developed by OpenAI has captured the imagination of developers, businesses, and researchers alike. While ChatGPT is undoubtedly impressive out of the box, what if you could enhance its capabilities to align more closely with your specific needs? This blog will delve into the fascinating realm of customizing ChatGPT with your own data, unlocking the potential for a more tailored and effective AI interaction.</p>
        
          <h2>Customization Starts with Data</h2>
          <p class='para'>Customization starts with data – the fuel that powers the AI's learning process. The initial step involves gathering a dataset that mirrors the language, context, and domain you want the AI to excel in. Whether it's customer support conversations, medical terminology, or legal discourse, the dataset should encapsulate the essence of your desired interaction. Once collected, the data needs meticulous preparation. Cleaning and structuring the dataset are crucial to eliminate noise and ensure the AI's optimal learning. The quality of your dataset directly influences the effectiveness of your customized model.</p>
        
          <h2>Fine-Tuning for Personalization</h2>
          <p  class='para'>Fine-tuning is where your customization efforts come to life. While, as of my last update in September 2021, fine-tuning GPT-3 models like ChatGPT isn't directly available to the public, GPT-2 models can be fine-tuned with OpenAI's guidance. Fine-tuning involves training the model on your prepared dataset, allowing it to adapt to your specific language patterns and nuances. This process is akin to teaching the AI a new dialect, ensuring its responses align more closely with your objectives. The iterative nature of fine-tuning allows you to refine the AI's output over time, enhancing its performance.</p>
        
          <h2>Putting Your Customized Model into Action</h2>
          <p  class='para'>With your fine-tuned model ready, it's time to put it into action. Integrating the model into your application or platform lets you witness the fruits of your customization labor. You provide prompts or queries that resonate with your dataset, and the AI generates responses that embody your desired style, tone, and context. As users interact with your AI, their feedback becomes invaluable for further improvement. Regular monitoring and tweaks based on real-world interactions help in the ongoing enhancement of the AI's accuracy and effectiveness.</p>
        
          <p  class='para'>Customizing ChatGPT with your own data is a journey that merges cutting-edge technology with your specific needs. While GPT-3 model fine-tuning might currently remain behind the curtain, the principles of customization hold true with GPT-2 models. As AI continues to advance, the prospect of refining AI interactions becomes even more enticing. Whether it's creating bespoke virtual assistants, specialized content generators, or industry-specific chatbots, customization empowers you to harness AI as a tool that resonates uniquely with your goals. The horizon of AI customization holds the promise of shaping more personalized, efficient, and impactful human-AI interactions in the years to come.</p>
          `,
      date: '2023-06-26',
    },
    {
      id: 2,
      imageHeading: 'Top 5 Best ChatGPT Plugins for Business',
      imageSubheading: 'James Pog',
      company: 'Podcast',
      imageSource: 'https://i0.wp.com/bdtechtalks.com/wp-content/uploads/2022/12/openai-chatgpt.jpg?fit=1920%2C1200&ssl=1',
      blogContent: `
          <h1>Top 5 Best ChatGPT Plugins for Business</h1>
  <p  class='para'>Following the release of GPT-4, OpenAI introduced ChatGPT plugins, a new approach to enhance the AI chatbot's capabilities. At launch, about 85 plugins were accessible exclusively to ChatGPT Plus customers. However, that number has subsequently climbed to hundreds. Unfortunately, a large percentage of these plugins accomplish nothing noteworthy.</p>
  
  <p  class='para'>To make your search easier, we've carefully analyzed the store's huge range of plugins and created a list of some of the most helpful ChatGPT plugins worth downloading.</p>
  
  <p class='para'>Let's check them out!</p>
  
  <ul style="list-style-type: none">
    <div>
      <h2>WebsiteChat</h2>
      <p class='para'>One of the glaring issues with ChatGPT is its inability to search the internet.</p>
      <p class='para'>WebsiteChat fixes this by introducing the awesome ability to load and query websites, extracting data, providing summaries, it can do anything!</p>
      <p class='para'>Definitely one of my most used ChatGPT plugins so far. Check it out in the plugin store for sure.</p>
    </div>
    <div>
      <h2>Zapier</h2>
      <p class='para'>The Zapier plugin for ChatGPT enables effortless connectivity with over 5,000 applications such as Google Sheets, Gmail, and Slack.</p>
      <p class='para'>With this plugin, you can easily automate tasks and integrate various apps to streamline your workflow. Whether it's sending emails, updating spreadsheets, or coordinating notifications, the Zapier plugin empowers you to efficiently manage and coordinate your digital ecosystem.</p>
      <p class='para'>Visit their official website for comprehensive instructions on how to connect and utilize the Zapier plugin.</p>
    </div>
    <div>
      <h2>Expedia</h2>
      <p class='para'>The Expedia plugin is a convenient tool that allows users to handle various aspects of their travel plans. With this plugin, you can effortlessly book flights, plan your trip, rent a car, and arrange accommodations.</p>
      <p class='para'>Whether you're looking for top attractions in a specific destination or seeking recommendations for hotels, the Expedia plugin provides comprehensive assistance. Simply input your queries or requirements, and the plugin will help you find suitable options. It simplifies the travel planning process, making it easier to organize and coordinate your entire journey.</p>
    </div>
    <div>
      <h2>PromptPerfect</h2>
      <p class='para'>PromptPerfect is an invaluable plugin that automatically refines and enhances prompts for various language models such as ChatGPT, GPT-3.5, DALL-E 2, StableDiffusion, and MidJourney.</p>
      <p class='para'>By using the PromptPerfect plugin, you can optimize the quality and effectiveness of your prompts, leading to more accurate and relevant responses. Simply prepend the word 'perfect' to your prompt, and the plugin will work its magic to improve the prompt's formulation.</p>
      <p class='para'>This ensures a smoother and more productive interaction with the language models, enhancing the overall user experience and yielding better results.</p>
    </div>
    <div>
      <h2>OpenTable</h2>
      <p class='para'>The OpenTable plugin is a valuable tool that simplifies the process of finding and booking restaurants. With this plugin, you can receive personalized restaurant recommendations based on your location and preferences.</p>
      <p class='para'>It allows you to explore and discover the best dining options in your area. Additionally, the OpenTable plugin enables you to make advance table reservations, ensuring a hassle-free dining experience.</p>
      <p class='para'>Whether you're searching for a specific cuisine or need a reservation for a particular date and time, the OpenTable plugin provides convenient assistance. Simply input your requirements, and the plugin will help you find and secure a table at your desired restaurant.</p>
      <p class='para'>I personally use it all the time, it's truly unique this experience of having a personal AI reservation making assistant.</p>
    </div>
  </ul>
          `,
      date: '2023-06-27',
    },
    {
      id: 3,
      imageHeading: 'Impact of AI on Business',
      imageSubheading: 'Hughes Campbell',
      company: 'Fludder',
      imageSource: businessAi,        
      blogContent: `
          <h1>AI and Small Businesses: Impact and Opportunities</h1>
          <p class='para'>AI has a significant impact on small businesses in various ways, particularly in strategy and
          operations. Here are some key areas where AI is making a difference:</p>
          <ul style="list-style-type: none" >
            <div>
              <h4>Data Analysis and Decision Making</h4>
              <p class='para'>AI can analyze large amounts of data quickly and
              accurately, providing insights that can inform strategic decisions. AI Decision Making
              can help small businesses understand their customers better, identify trends and patterns,
              and make data-driven decisions. Machine learning algorithms can predict future trends
              based on past data, which can be invaluable for strategic planning.</p>
            </div>
            <div>
              <h4>Customer Service</h4>
              <p class='para'>AI-powered chatbots and virtual assistants can handle customer
              inquiries 24/7, providing instant responses and freeing human staff for more complex
              tasks. AI-Powered Customer Service not only improves customer service but also reduces
              operational costs.</p>
            </div>
            <div>
              <h4>Marketing and Sales</h4>
              <p class='para'>AI can help small businesses personalize their marketing and sales
              efforts. For example, AI can analyze customer behavior and preferences to deliver
              personalized product recommendations and targeted advertising. AI in Marketing and
              Sales This can increase conversion rates and customer loyalty.</p>
            </div>
            <div>
              <h4>Supply Chain and Inventory Management</h4>
              <p class='para'>AI can predict product demand and
              optimize inventory levels, reducing the risk of overstocking or understocking. It can also
              help with logistics, such as optimizing delivery routes.</p>
            </div>
            <div>
              <h4>Automation of Routine Tasks</h4>
              <p class='para'>AI can automate routine tasks, such as invoicing,
              payroll, and reporting. AI Automation of Routine Tasks can save time and reduce the risk
              of human error.</p>
            </div>
            <div>
              <h4>Cybersecurity</h4>
              <p class='para'>AI can help small businesses protect their data and digital assets by
              detecting unusual behavior and potential threats, and it is imperative as cyber threats
              become more brazen and sophisticated.</p>
            </div>
            <div>
              <h4>Product Development</h4>
              <p class='para'>AI can help small businesses innovate by analyzing customer
              feedback and market trends to identify opportunities for new products or improvements
              to existing ones.</p>
            </div>
            <div>
              <h4>Human Resources</h4>
              <p class='para'>AI can streamline recruitment by screening resumes and predicting
              candidate fit. It can also help with employee training and performance management.</p>
            </div>
          </ul>
          <p class='para'>While AI can bring many benefits, small businesses must also consider the potential challenges.
          These can include the cost of implementing AI solutions, the need for technical expertise, and
          issues around data privacy and security. It&#39;s also vital to consider AI&#39;s impact on jobs and provide
          training and support for employees as roles and tasks evolve. We will now explore seven pros and cons of implementing AI in small business operations.</p>
        <img src='${aibuss}' alt='aibuss' style='height:100% ; max-height:600px; max-width:600px' >
          <h2 style='padding-top:30px'>Pros of Implementing AI in Business Operations</h2>
          <ul style="list-style-type: none">
            <div>
              <h4>Improved Efficiency and Productivity</h4>
              <p class='para'>Artificial Intelligence (AI) can automate many
              repetitive tasks, from data entry and invoice processing to customer service inquiries and   
              routine reporting. By taking over these everyday tasks, AI can significantly reduce the
              time and effort that employees need to spend on them. AI not only increases operational
              efficiency but also minimizes the risk of errors that can occur with manual processes.
              Automating repetitive tasks also frees employees to focus on more strategic, value-added
              activities. Instead of spending their time on routine tasks, employees can concentrate on
              areas where they can add value, such as strategic planning, problem-solving, innovation,
              and customer relationship building. AI leads to more meaningful and satisfying work,
              boosting employee engagement and productivity.</p>
            </div>
            <div>
              <h4>Data-Driven Decision-Making</h4>
              <p class='para'>Artificial Intelligence (AI) has the remarkable ability to
              analyze vast amounts of data at a speed and accuracy far surpassing human capabilities.
              This data can come from various sources, such as customer interactions, sales
              transactions, social media feeds, and market trends. By processing this data, AI can
              uncover patterns, correlations, and trends that might go unnoticed. These insights can be
              invaluable in driving strategic decision-making. For instance, AI can identify which
              products are selling well and which are not, enabling businesses to adjust their product
              offerings and marketing strategies accordingly. It can also predict future trends, allowing
              companies to anticipate market changes and stay ahead of the curve.</p>
            </div>
            <div>
              <h4>Enhanced Customer Experience</h4>
              <p class='para'>Artificial Intelligence (AI) has revolutionized
              customer service through chatbots and virtual assistants. These AI-powered tools can
              provide round-the-clock customer service, ensuring that customer queries and concerns
              are addressed promptly, regardless of the time of day or night. This 24/7 availability is
              particularly beneficial in today&#39;s global marketplace, where customers may be spread
              across different time zones. AI chatbots and virtual assistants can resolve queries quickly
              and efficiently. They can simultaneously handle multiple inquiries, reducing wait times
              and improving the customer experience. Moreover, they can be programmed to provide
              accurate and consistent responses, ensuring that customers receive reliable information.</p>
            </div>
            <div>
              <h4>Predictive Capabilities</h4>
              <p class='para'>Artificial Intelligence (AI) can analyze vast amounts of
              historical data, identify patterns, and predict future trends. This predictive power is
              instrumental in understanding customer behavior. AI can forecast what customers might
              want or need by analyzing past interactions, purchases, and behaviors. This forward-
              looking approach can significantly enhance marketing and sales strategies. For instance,
              businesses can use AI to personalize marketing messages, tailoring them to individual
              customer preferences and predicted behaviors. These predictive capabilities lead to more
              engaging and effective marketing campaigns, boosting conversion rates and customer
              loyalty. In sales, AI can help identify potential leads and predict which customers will
              most likely make a purchase.</p>
            </div>
            <div>
              <h4>Cost Savings</h4>
              <p class='para'>Artificial Intelligence (AI) is a powerful tool that can automate tasks, from
              simple administrative duties to complex analytical processes. This automation capability
              reduces the time and effort required to perform these tasks and minimizes the risk of
              human error, thereby enhancing overall operational efficiency. These efficiency gains can
              translate into substantial cost savings for small businesses operating on tight budgets. By
              automating routine tasks, companies can reallocate their human and financial resources to
              more strategic, revenue-generating activities. Moreover, AI systems can work around the
              clock without needing breaks, vacations, or sick leave, offering productivity far
              exceeding human capacity.</p>
            </div>
            <div>
              <h4>Scalability</h4>
              <p class='para'>Artificial Intelligence (AI) systems offer a unique advantage to businesses,
              especially in terms of scalability and adaptability. As a business expands, the volume and
              complexity of tasks often increase proportionately. AI systems, however, are designed to
              handle this surge efficiently without compromising on the quality or speed of work. They
              can process vast amounts of data, manage intricate tasks, and even learn from their
              experiences to improve performance over time. Moreover, these systems can be
              programmed to adapt to evolving business needs, making them a flexible and scalable
              solution that can support business growth and change.</p>
            </div>
            <div>
              <h4>Innovation</h4>
              <p class='para'>Artificial Intelligence (AI) is a transformative technology that is reshaping
              the business landscape by unlocking a wealth of opportunities for innovation. It
              empowers businesses to create novel products and services tailored to customer needs
              based on insights gleaned from data analysis and predictive modeling. In addition to
              product and service innovation, AI enables the development of unique business models.
              Businesses can redefine their operational processes, customer engagement strategies, and
              revenue streams by leveraging AI&#39;s capabilities. For instance, a company could transition
              from a traditional sales model to a subscription-based or on-demand model driven by AI&#39;s
              ability to predict customer behavior and preferences.</p>
            </div>
          </ul>
        
          <h2>Cons of Implementing AI in Business Operations</h2>
          <ul style="list-style-type: none">
            <div>
              <h4>High Initial Costs</h4>
              <p class='para'>Implementing AI can be expensive, with costs for software,
              hardware, and expertise a significant barrier for small businesses.</p>
            </div>
            <div>
              <h4>Technical Expertise</h4>
              <p class='para'>AI systems require technical expertise to implement and manage a
              challenge for small businesses needing this Expertise in-house.</p>
            </div>
            <div>
              <h4>Data Privacy Concerns</h4>
              <p class='para'>AI systems often require access to sensitive data, raising
              concerns about data privacy and security, leading to reputational risk if not managed
              properly.</p>
            </div>
            <div>
              <h4>Dependence on Vendor</h4>
              <p class='para'>If a business relies on a third-party vendor for its AI solution, it
              may become dependent on that vendor leading to issues if the vendor goes out of
              business or changes its pricing or service terms.</p>
            </div>
            <div>
              <h4>Job Displacement</h4>
              <p class='para'>AI can automate specific jobs, potentially leading to job
              displacement, morale issues, and resistance to change.</p>
            </div>
            <div>
              <h4>Lack of Personal Touch</h4>
              <p class='para'>While AI can improve efficiency, it can also lead to a lack of
              personal touch in customer interactions, a disadvantage in industries where personal
              relationships and human interaction are essential.</p>
            </div>
            <div>
              <h4>Unpredictable Outcomes</h4>
              <p class='para'>AI systems can sometimes produce unexpected or incorrect
              results, mainly when dealing with complex or ambiguous situations leading to errors and
              potential risks.</p>
            </div>
          </ul>
        
          <p class='para'><strong>Summary:</strong> AI offers significant opportunities for small businesses, including improved efficiency, data-
          driven decision-making, enhanced customer experience, predictive capabilities, cost savings,
          scalability, and innovation. However, it also presents challenges, including high initial costs, the
          need for technical expertise, data privacy concerns, dependence on vendors, job displacement, a
          lack of personal touch, and unpredictable outcomes.</p>
          <p class='para'>The decision to incorporate Artificial Intelligence (AI) into business operations is a significant
          one that should be based on a thorough evaluation of the potential benefits and drawbacks. This
          evaluation should consider the specific context and needs of the business. For instance, a
          company with a high volume of repetitive tasks or a large amount of data to analyze might
          benefit significantly from AI. At the same time, a business with a more unique, creative focus
          might find less value in AI automation.</p>
          <p class='para'>Moreover, the effectiveness of AI depends on the quality of the data it&#39;s trained on. If the data is
          biased or incomplete, this can lead to inaccurate or limited results. Therefore, businesses must
          ensure they have good data management practices. AI should be considered part of a broader
          business strategy rather than a standalone solution.</p>
          `,
      date: '2023-06-28',
    },
    {
      id: 4,
      imageHeading: 'AI and Dental Offices',
      imageSubheading: 'Kimiko Nyugen',
      company: 'Podcast',
      imageSource: dental,
      blogContent: `
          <h1>AI and Dental Offices – A Glimpse of AI Usage in Dental Service Organizations</h1>
          <p class='para'>The healthcare sector has witnessed a paradigm shift with the advent of artificial intelligence
          (AI), and dentistry is no exception. As we stand in 2023, dental service organizations (DSOs)
          and private practices are leveraging AI to redefine patient care, enhance treatment acceptance,
          and boost revenue. Let&#39;s delve into how AI is reshaping the dental landscape.</p>
          <h2>Precision Diagnostics: AI's Role in X-ray Analysis</h2>
          <p class='para'>Time is a luxury that dentists and
          hygienists often don&#39;t have. With back-to-back appointments, ensuring consistent and accurate
          diagnosis can be challenging. Enter AI. With its ability to instantly analyze and annotate X-rays,
          AI provides dental professionals a treasure trove of objective data.</p>
          <h3>Key Benefits:</h3>
          <ul style="list-style-type: none" >
            <p class='para'><strong>Focused Attention:</strong> AI pinpoints areas of concern, allowing clinicians to direct their attention efficiently.</p>
            <p class='para'><strong>Clarity in Interpretation:</strong> With AI, the ambiguity surrounding X-ray interpretations diminishes.</p>
            <p class='para'><strong>Consistent Diagnostics:</strong> AI ensures a standardized approach, bolstering diagnostic confidence.</p>
          </ul>
          <h2>Elevating Patient Trust: AI as an Educational Tool</h2>
          <p class='para'>Despite advancements, many patients perceive dental procedures as discretionary rather than
          essential. AI bridges this gap by transforming traditional X-rays into an interactive learning
          experience. Overjet&#39;s AI solution stands out in this regard. It&#39;s the only FDA-cleared AI tool that
          detects and outlines decay. Quantifying bone level measurements and visually representing
          cavities fosters a collaborative environment where patients can co-diagnose. This visual
          representation enhances patient-provider communication and fortifies trust, leading to increased
          treatment acceptance.</p>
          <h2>Empowering Dental Teams with AI</h2>
          <p class='para'>AI isn&#39;t just a tool; it&#39;s an ally. For dental professionals, AI-assisted dentistry is a game-changer.
          It not only refines their diagnostic prowess but also streamlines case presentations. The ease it
          brings to their roles can significantly boost job satisfaction and retention.
          Moreover, AI is a trump card for DSOs and dental practices on a hiring spree in 2023.
          Showcasing their investment in cutting-edge technology signals a commitment to superior
          patient care and a supportive work environment for their team.</p>
          <h2>Efficiency and Time-Saving: AI's Operational Brilliance</h2>
          <p class='para'>Overjet's AI solution exemplifies how AI can streamline dental operations:</p>
          <ul style="list-style-type: none">
            <p class='para'><strong>Patient Dashboard:</strong> Overjet identifies potential services by reviewing past X-rays and practice management data, aiding in schedule optimization and enhancing per-visit production.</p>
            <p class='para'><strong>Swift Diagnostics:</strong> AI-driven insights guide providers, ensuring rapid and precise diagnoses.</p>
            <p class='para'><strong>Visual Case Presentation:</strong> AI annotations make complex dental conditions easily understandable, reinforcing the adage, "A picture is worth a thousand words."</p>
            <p class='para'><strong>Efficient Claim Submissions:</strong> With quantified data backing diagnoses, claim submissions become smoother, reducing tedious interactions with insurance companies.</p>
          </ul>
          <h2>AI in Dentistry: Embracing the Future</h2>
          <p class='para'>The ultimate goal for dental professionals is to make a tangible difference in their patient&#39;s lives.
          AI is the catalyst that amplifies their impact. From enriching diagnostic data to offering
          compelling visualizations that enhance treatment acceptance to providing dental insurers with
          quantifiable data to expedite claim approvals, AI is poised to be the cornerstone of dental success
          in 2023.</p>
          <p class='para'>In conclusion, as we navigate the evolving landscape of dentistry, it&#39;s evident that AI is not just
          an auxiliary tool but a transformative force, heralding a new era of enhanced patient care and
          operational excellence.</p>
          `,
      date: '2023-06-28',
    },
    // {
    //   id: 4,
    //   imageHeading: 'Image Heading 4',
    //   imageSubheading: 'Image Subheading 4',
    //   company: 'Company Name 4',
    //   imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    //   heading: 'Heading 4',
    //   text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
    //   date: '2023-06-29',
    // },
    // {
    //   id: 5,
    //   imageHeading: 'Image Heading 5',
    //   imageSubheading: 'Image Subheading 5',
    //   company: 'Company Name 5',
    //   imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    //   heading: 'Heading 5',
    //   text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
    //   date: '2023-06-30',
    // },
    // {
    //   id: 6,
    //   imageHeading: 'Image Heading 6',
    //   imageSubheading: 'Image Subheading 6',
    //   company: 'Company Name 6',
    //   imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
    //   heading: 'Heading 6',
    //   text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
    //   date: '2023-07-01',
    // },
  ];

 

  const [x, setX] = useState(dataArray[id - 1])
  console.log(x)

  return (
    <div className='py-5  ' style={{ backgroundColor: '#242439', width: '100vw' }}>
<div className='row d-flex row col-lg-8 col-sm-10 col-11 justify-content-center mx-auto ' style={{border:'1px solid rgb(255,255,255,0.4)'}}>
      <div id={x.id} className=' row px-0 row d-flex col-11  pb-2   mx-xxl-5 mx-2 my-5 mt-3  d-flex  justify-content-center ' style={{ borderRadius: '10%' }}>
          <h1 style={{ color: 'white' }} className=' py-2 mx-3 mb-0 mt-4 px-1 fw-bold  text-uppercase '>{x.imageHeading}</h1>
          <h3 style={{ color: 'white' }} className=' py-2 mx-3  px-1   text-uppercase '>{x.imageSubheading}</h3>
          <img
            style={{ width: '100%' }}
            className='px-0'
            alt='loading...'
            src={x.imageSource}
          />
      </div>

      <div id={x.id} className=' row px-sm-5 px-1 py-3 row d-flex  col-11  mx-xxl-5 mx-lg-2 mx-0 my-5  d-flex  justify-content-start ' style={{ height: '100%', borderRadius: '20px', color:'white' }}>
        <p className='mt-3'>{x.date}</p>
        { ReactHtmlParser(x.blogContent)}
      </div>
      </div>
</div>

  )
}

export default Section1BlogIndi