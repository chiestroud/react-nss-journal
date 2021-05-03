import React from 'react';
import journal from '../assets/nssjournal.png';

export default function JanApr() {
  return (
    <section className="janapr">
      <header>Jan ~ Apr NSS Journal is located here:</header>
      <img width='500px' src={journal} alt='journal' />
      <a href='https://cs-journal-nss.netlify.app' target='_blank' rel="noreferrer">Link to Jan ~ Apr Journal Page</a>
    </section>
  );
}
