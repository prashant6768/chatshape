import {React,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Section1BlogIndi = () => {

    const { id } = useParams()

    const dataArray = [
        {
          id: 1,
          imageHeading: 'How to Customize ChatGPT with your data',
          imageSubheading: 'Tim Smith',
          company: 'Zema',
          imageSource: 'https://www.chatshape.com/assets/blog/hello-world/cover.jpg',
          heading: 'How to Customize ChatGPT with your data',
          text: "ChatGPT, powered by OpenAI's advanced language model, GPT-3.5, has revolutionized the way we interact with AI-powered chatbots. While ChatGPT is a powerful tool out-of-the-box, one of its most remarkable features is the ability to be customized with your data. This capability allows developers and businesses to train the model to better suit specific use cases and industries, unlocking endless possibilities for personalization and improved user experiences. The Power of Customization: Customizing ChatGPT with your data enables the model to learn from domain-specific information, making it more knowledgeable and context-aware in specialized fields. For instance, businesses in finance can train ChatGPT on financial data to provide tailored investment advice, while healthcare organizations can utilize patient records to create a more accurate and empathetic virtual medical assistant.Data Privacy and Security:As enticing as customization sounds, it is essential to emphasize the significance of data privacy and security. OpenAI takes data protection seriously and ensures that any data used to fine-tune ChatGPT is handled with utmost confidentiality. User data remains anonymous and is stripped of any personally identifiable information during the customization process.Ethical AI Customization:While customization presents exciting possibilities, it is equally crucial to deploy AI responsibly. Developers should be aware of the risks associated with biased data and ensure they curate diverse datasets to mitigate any potential harmful effects. OpenAI encourages users to follow ethical guidelines and prioritize fairness, transparency, and accountability in AI deployment.",
          text2:"Conclusion:Customizing ChatGPT with your data empowers you to build AI applications that cater specifically to your audience and industry needs. The ability to fine-tune the language model offers a unique opportunity to create more intelligent and contextually aware conversational agents. By coupling customization with responsible AI practices, we can unlock the full potential of ChatGPT while ensuring a safer and more inclusive AI-powered future.",
          date: '2023-06-26',
        },
        {
          id: 2,
          imageHeading: 'Top 5 Best ChatGPT Plugins for Business',
          imageSubheading: 'James Pog',
          company: 'Podcast',
          imageSource: 'https://www.chatshape.com/assets/blog/dynamic-routing/cover.jpg',
          heading: 'Top 5 Best ChatGPT Plugins for Business',
          text: "Top 5 ChatGPT Plugins for Business:GPT-3 Integration Plugin: This plugin seamlessly integrates GPT-3, the powerful language model behind ChatGPT, into various business applications. By leveraging GPT-3's capabilities, businesses can enhance customer support, generate creative content, and automate repetitive tasks, thereby improving efficiency and productivity.ChatGPT Live Chat Plugin: This plugin brings the power of ChatGPT to live chat interactions on business websites. It enables real-time, AI-powered customer support, allowing businesses to engage with website visitors, answer inquiries, and provide personalized assistance around the clock. This level of responsiveness can significantly boost customer satisfaction and retention.GPT-3 Content Generator Plugin: Content creation is a time-consuming task for businesses. With this plugin, companies can generate high-quality articles, blog posts, and social media content effortlessly. By providing key inputs, GPT-3 can craft content that aligns with the brand's tone and style, saving businesses valuable time and resources.GPT-3 Language Translation Plugin: For businesses operating in a global market, language barriers can be a significant challenge. This plugin utilizes GPT-3's language capabilities to offer real-time translation services, enabling seamless communication with customers and partners from different linguistic backgrounds.GPT-3 Data Analytics Plugin: Extracting valuable insights from vast amounts of data is vital for business decision-making. This plugin utilizes GPT-3 to analyze complex datasets, generate reports, and identify trends, helping businesses make data-driven decisions efficiently.",
          text2:"In conclusion, these top 5 ChatGPT plugins for business harness the power of AI language models to streamline operations, enhance customer interactions, and boost overall productivity. By integrating these plugins into their workflows, businesses can stay ahead in the competitive landscape and deliver exceptional experiences to their customers.",
          date: '2023-06-27',
        },
        {
          id: 3,
          imageHeading: 'Impact of AI on Business',
          imageSubheading: 'Hughes Campbell',
          company: 'Fludder',
          imageSource: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg',
          heading: 'Impact of AI on Business',
          text: "Artificial Intelligence (AI) has emerged as a transformative technology, reshaping the way businesses operate, make decisions, and interact with customers. Its impact on various industries has been profound, offering unprecedented opportunities for growth, efficiency, and innovation. Here are some key ways AI is influencing businesses: Enhanced Data Analysis: AI enables businesses to analyze vast amounts of data quickly and accurately. Machine learning algorithms can uncover valuable insights, patterns, and trends that were previously difficult to detect. This data-driven approach empowers businesses to make more informed decisions, identify new market opportunities, and optimize operations.Personalized Customer Experience: AI-powered chatbots and virtual assistants have revolutionized customer service. They can provide personalized recommendations, respond to queries, and address customer concerns in real-time. By offering tailored experiences, businesses can improve customer satisfaction, increase retention, and build brand loyalty.Process Automation: AI-driven automation streamlines repetitive tasks, freeing up human resources for more strategic and creative endeavors. Automation can be applied to various functions, such as inventory management, order processing, and customer support, leading to cost savings and greater operational efficiency.Predictive Analytics: AI's predictive capabilities enable businesses to forecast future trends and anticipate customer preferences. By understanding consumer behavior, companies can tailor marketing campaigns, product offerings, and pricing strategies to stay ahead of the competition.Supply Chain Optimization: AI optimizes supply chain management by predicting demand, managing inventory levels, and improving logistics efficiency. This results in reduced costs, faster delivery times, and a more resilient supply chain capable of adapting to disruptions.",
          text2:"In conclusion, AI's impact on businesses has been transformative, streamlining processes, enabling data-driven decision-making, and enhancing customer experiences. Embracing AI responsibly can unlock endless opportunities for growth and innovation. However, businesses must prioritize ethical considerations, ensuring transparency, fairness, and privacy to build trust with customers and stakeholders. By leveraging AI's potential responsibly, businesses can navigate the dynamic landscape, stay ahead of the curve, and drive sustainable success in the era of intelligent technologies.",
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


const[x,setX]=useState(dataArray[id-1])
console.log(x)

  return (
    <div className='pb-5 mx-0 d-flex row justify-content-center ' style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>
         <div id={x.id} className=' row px-0 row d-flex  col-11  mx-xxl-5 mx-2 my-5  d-flex  justify-content-center ' style={{ height: '450px', borderRadius:'10%' }}>
          <div className='col-sm-8 px-0 py-3 hovercolor brt' style={{}}>
            <h1 style={{color:'white', backgroundColor:'#CE98E8'}} className=' py-2 mx-3 mb-0 mt-4 px-1 fw-bold  text-uppercase '>{x.imageHeading}</h1>
            <h3 style={{color:'black', backgroundColor:'#F6BDFF'}} className=' py-2 mx-3  px-1   text-uppercase '>{x.imageSubheading}</h3>
            <p className=' pt-2 pb-0 mb-0 mx-3  px-1 ' style={{color:'black'}}>{x.company}</p>
          </div>
          <div className='col-sm-4 px-0' style={{ }}>
            <img
              style={{ width: '100%', height: '100%'}}
              className='px-0 bri'
              alt='loading...'
              src={x.imageSource}
            />
          </div>
        </div>

        <div id={x.id} className=' row px-sm-5 px-1 py-3 row d-flex  col-11  mx-xxl-5 mx-lg-2 mx-0 my-5  d-flex  justify-content-start ' style={{ height: '100%', borderRadius:'20px', backgroundColor:'white' }}>
          <p>{x.date}</p>
          <h1 className='fw-bolder fs-1'>{x.heading}</h1>
          <p className='py-3 fw-semibold'>{x.text}</p>
          <p className='py-3 fw-semibold'>{x.text2}</p>
        </div>


    </div>
  )
}

export default Section1BlogIndi