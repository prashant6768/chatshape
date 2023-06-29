import React from 'react'
import '../BlogPage/gradientCss.css'
import { Link } from 'react-router-dom';

const Section2Blog = () => {

    const dataArray = [
        {
          id: 1,
          imageHeading: 'Image Heading 1',
          imageSubheading: 'Image Subheading 1',
          company: 'Company Name 1',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 1',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-06-26',
        },
        {
          id: 2,
          imageHeading: 'Image Heading 2',
          imageSubheading: 'Image Subheading 2',
          company: 'Company Name 2',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 2',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-06-27',
        },
        {
          id: 3,
          imageHeading: 'Image Heading 3',
          imageSubheading: 'Image Subheading 3',
          company: 'Company Name 3',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 3',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-06-28',
        },
        {
          id: 4,
          imageHeading: 'Image Heading 4',
          imageSubheading: 'Image Subheading 4',
          company: 'Company Name 4',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 4',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-06-29',
        },
        {
          id: 5,
          imageHeading: 'Image Heading 5',
          imageSubheading: 'Image Subheading 5',
          company: 'Company Name 5',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 5',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-06-30',
        },
        {
          id: 6,
          imageHeading: 'Image Heading 6',
          imageSubheading: 'Image Subheading 6',
          company: 'Company Name 6',
          imageSource: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          heading: 'Heading 6',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente repellendus officiis dolorem debitis quasi, ex minus excepturi! Excepturi eveniet tempore a quam qui ut consequuntur minus aliquam, id quaerat numquam et nobis atque, vel alias corporis quasi, itaque nemo exercitationem beatae impedit error similique ex? Adipisci provident eius sequi natus repellendus soluta deserunt eligendi. Aliquid accusantium blanditiis natus incidunt exercitationem ducimus laboriosam quibusdam eos voluptatum maxime, inventore quasi ratione eius fugit ex nihil. Quisquam veniam nemo distinctio autem quasi officiis aut dolorem, culpa voluptatem totam non accusamus commodi eligendi animi libero vero nam possimus! Placeat, dolorem earum non enim quia exercitationem, nostrum repudiandae atque nam ex omnis beatae. Maxime debitis ullam, architecto quis recusandae illo quibusdam eveniet! Id cupiditate quos quibusdam rerum maxime aspernatur omnis illum iste officiis porro provident consequatur quo hic atque accusantium laborum reiciendis doloremque corporis ratione voluptatum ad dolore optio, molestias in. Nulla commodi sequi amet, praesentium laudantium pariatur. Autem optio aut perferendis aspernatur. Dolor eveniet omnis totam aperiam ducimus est cumque maxime autem molestias officia, ad id? Praesentium quia illum molestiae recusandae dolorem tenetur obcaecati, ullam porro eius harum eum! Quo modi, laudantium expedita maxime molestiae nam quasi quaerat beatae fuga dicta eum doloribus.',
          date: '2023-07-01',
        },
      ];

  return (
    <div className='pb-5 mx-0 d-flex row justify-content-center ' style={{ backgroundColor: '#242439', height: '100%',width:'100vw' }}>
       { dataArray.map(x =>(
        <Link to={`/blog/${x.id}`} className=' row d-flex col-lg-5 col-sm-10 col-11  mx-xxl-5 mx-2 my-5 ' style={{textDecoration:'none'}}>
         <div id={x.id} className=' row px-0  d-flex hovertran justify-content-center ' style={{ height: '350px', borderRadius:'10%' }}>
          <div className='col-8 flex-wrap px-0 py-3 hovercolor' style={{ borderTopLeftRadius:'15px', borderBottomLeftRadius:'15px'}}>
            <h1 style={{color:'white', backgroundColor:'#CE98E8'}} className=' py-2 mx-3 mb-0 mt-4 px-1 fw-bold  text-uppercase '>{x.imageHeading}</h1>
            <h3 style={{color:'black', backgroundColor:'#F6BDFF'}} className=' py-2 mx-3  px-1   text-uppercase '>{x.imageSubheading}</h3>
            <p className=' pt-2 pb-0 mb-0 mx-3  px-1 ' style={{color:'black'}}>{x.company}</p>
          </div>
          <div className='col-4 px-0 flex-wrap' style={{ }}>
            <img
              style={{ width: '100%', height: '100%', borderTopRightRadius:'15px', borderBottomRightRadius:'15px',boxShadow:'-2px 0px 5px grey' }}
              className='px-0'
              alt='loading...'
              src={x.imageSource}
            />
          </div>
        </div>
        </Link>
        ))}
    </div>
  )
}

export default Section2Blog