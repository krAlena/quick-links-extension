import * as React from 'react';

const InfoSvgIcon = (props) => (
    // <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path {...props} fill-rule="evenodd" clip-rule="evenodd" d="M1.5 12C1.5 6.47715 5.97715 2 11.5 2C17.0228 2 21.5 6.47715 21.5 12C21.5 17.5228 17.0228 22 11.5 22C5.97715 22 1.5 17.5228 1.5 12ZM3.5 12C3.5 16.4183 7.08172 20 11.5 20C15.9183 20 19.5 16.4183 19.5 12C19.5 7.58172 15.9183 4 11.5 4C7.08172 4 3.5 7.58172 3.5 12ZM9.96159 8.106V8.134C9.96159 8.806 10.4796 9.324 11.1796 9.324C11.8796 9.324 12.3976 8.806 12.3976 8.134V8.106C12.3976 7.434 11.8796 6.916 11.1796 6.916C10.4796 6.916 9.96159 7.434 9.96159 8.106Z" fill="#A2A5B9"/>
    //     <path {...props} d="M12.5 12.25V15.75C12.5 16.4404 11.9404 17 11.25 17C10.5596 17 10 16.4404 10 15.75V12.25C10 11.5596 10.5596 11 11.25 11C11.9404 11 12.5 11.5596 12.5 12.25Z" fill="#A2A5B9"/>
    // </svg>

    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path {...props} d="M10.3333 18.6667C14.9357 18.6667 18.6667 14.9357 18.6667 10.3333C18.6667 5.73096 14.9357 2 10.3333 2C5.73096 2 2 5.73096 2 10.3333C2 14.9357 5.73096 18.6667 10.3333 18.6667Z" stroke="#A2A5B9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path {...props} d="M10.3335 13.8V9.6333" stroke="#A2A5B9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path {...props} d="M10.3335 7H10.3418" stroke="#A2A5B9" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

export default InfoSvgIcon;