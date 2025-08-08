import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TouristPlacesPage.css';

const samplePlaces = [
  {
    id: 1,
    name: 'Sigiriya',
    location: 'Sri Lanka',
    desc: 'The Sigiriya rocky plain, made of magma from an extinct volcano, rises 200 meters above the forest. The site amazes visitors with its harmony of ancient architecture and natural beauty.',
    img: '/images/sigiria.jpg',
  },
  {
    id: 2,
    name: 'Ella',
    location: 'Sri Lanka',
    desc: 'Ella is a hill country village surrounded by tea fields and waterfalls. It’s known for scenic hikes like Ella Rock and the iconic Nine Arches Bridge.',
    img: '/images/ella.jpg',
  },
  {
    id: 3,
    name: 'Galle',
    location: 'Sri Lanka',
    desc: 'This 17th-century walled city blends colonial architecture with coastal charm. Cobblestone streets, boutiques, and ocean views define this UNESCO site.',
    img: '/images/galle-fort-1050x700-1.jpg',
  },
  {
    id: 4,
    name: 'Nuwara Eliya',
    location: 'Sri Lanka',
    desc: 'Blanketed in lush green tea fields, Nuwara Eliya is known for its cool weather, colonial charm, and scenic tea plantations.',
    img: '/images/nuwara-eliya-tea-plantations-visit.jpg',
  },
  {
    id: 5,
    name: 'Kandy',
    location: 'Sri Lanka',
    desc: 'One of Asia’s most spectacular festivals, the Esala Perahera in Kandy honors the sacred Tooth Relic with a parade of elephants and dancers.',
    img: '/images/temple-of-the-sacred-tooth-relic-kandy.jpg',
  },
  {
    id: 6,
    name: 'Yala National Park',
    location: 'Sri Lanka',
    desc: 'Sri Lanka’s most famous wildlife park, Yala offers thrilling safaris where you can spot leopards, elephants, and exotic birds.',
    img: '/images/yayala.png',
  },
  {
    id: 7,
    name: 'Mirissa',
    location: 'Sri Lanka',
    desc: 'Mirissa is a coastal gem known for its palm-fringed beach, turquoise waters, and seasonal whale watching.',
    img: '/images/mirisa.jpg',
  },
  {
    id: 8,
    name: 'Arugam Bay',
    location: 'Sri Lanka',
    desc: 'Famous for its world-class surf breaks, Arugam Bay is a laid-back beach town where waves and sunrises create the perfect getaway.',
    img: '/images/arugambay.jpg',
  },
  {
    id: 9,
    name: 'Koneswaram Temple',
    location: 'Sri Lanka',
    desc: 'Perched on a cliff above the sea, this ancient Hindu temple offers spiritual beauty and sweeping views of Trincomalee’s coast.',
    img: '/images/hindu-temple-koneswaram-trincomalee-swami-rock-sri-lanka-jane-coleman.jpg',
  },
  {
    id: 10,
    name: 'Adam’s Peak (Sri Pada)',
    location: 'Sri Lanka',
    desc: 'A sacred mountain climbed by pilgrims and travelers, Adam’s Peak rewards hikers with a spiritual sunrise and panoramic views.',
    img: '/images/sri-pada-adam-s-peak-sri-lanka.jpg',
  },
  {
    id: 11,
    name: 'Royal Palace Ruins',
    location: 'Sri Lanka',
    desc: 'These grand ruins in Polonnaruwa showcase the brilliance of ancient Sri Lankan architecture amidst lush surroundings.',
    img: '/images/polanaruwa.jpg',
  },
  {
    id: 12,
    name: 'Jetavanaramaya',
    location: 'Sri Lanka',
    desc: 'Built in the 3rd century, Jetavanaramaya is a towering stupa made of bricks, reflecting the engineering marvels of ancient Sri Lanka.',
    img: '/images/Jetavanaramaya-img-72.png',
  },
];

export default function TouristPlacesPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="places-container">
      <div className="top-bar">
        <h2>Welcome, {user.name}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="places-grid">
        {samplePlaces.map((place) => (
          <div className="place-card" key={place.id}>
            <img src={place.img} alt={place.name} className="place-image" />
            <h3>{place.name}</h3>
            <p className="place-location">{place.location}</p>
            <p className="place-desc">{place.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
