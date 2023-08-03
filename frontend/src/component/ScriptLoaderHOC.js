// ScriptLoaderHOC.js
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ScriptLoaderHOC = ({ scriptUrl, id, cred }) => {
  useEffect(() => {
    // Dynamically create a script element
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.id = id;
    script.setAttribute('cred', cred);
    script.defer = true;

    // Set the id and cred attributes
 

    // Append the script to the document head to trigger loading
    document.head.appendChild(script);

    // Clean up the script tag when the component unmounts to avoid memory leaks
    return () => {
      document.head.removeChild(script);
    };
  }, [scriptUrl, id, cred]);

  return null;
};

export default ScriptLoaderHOC;
