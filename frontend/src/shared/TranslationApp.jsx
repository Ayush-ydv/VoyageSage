import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Translate.css';
import googletranslate from '../assets/images/googletranslate.png';


const TranslationApp = () => {
  const [query, setQuery] = useState('');
  const [translation, setTranslation] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('es'); // Default target language set to Spanish
  const [showTranslationCard, setShowTranslationCard] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language set to English

  useEffect(() => {
    // Fetch the list of supported languages when the component mounts
    getSupportedLanguages();
  }, []);

  
  const getSupportedLanguages = async () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      headers: {
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'c4e10e15d2msh66a2f00a4571eebp1492dajsn69d4602d1f39', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setLanguages(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
  };

  const detectLanguage = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', query);

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'c4e10e15d2msh66a2f00a4571eebp1492dajsn69d4602d1f39', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setSourceLanguage(response.data.data.detections[0][0].language);
    } catch (error) {
      console.error(error);
    }
  };

  const translateText = async () => {
    await detectLanguage();

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', query);
    encodedParams.set('target', selectedLanguage);
    encodedParams.set('source', sourceLanguage);

    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': 'c4e10e15d2msh66a2f00a4571eebp1492dajsn69d4602d1f39', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslation(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTranslationCard = () => {
    setShowTranslationCard(!showTranslationCard);
  };

  const speakTranslation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translation);
      utterance.lang = selectedLanguage;
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in your browser.');
    }
  };

  return (
    <div className="app">
      {showTranslationCard && (
        <div className="translation-card">
          <h3>Translate Text</h3>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter text to translate"
            className="input-field"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="select-field"
          >
            {languages.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.language.toUpperCase()}
              </option>
            ))}
          </select>
          <button onClick={translateText} className="translate-button">
            Translate
          </button>
          <p>Detected Language: {sourceLanguage}</p>
          <p>Translation: {translation}</p>
          {translation && (
            <button onClick={speakTranslation} className="speak-button">
              <img
                src="https://image.flaticon.com/icons/png/128/1237/1237975.png"
                alt="Speaker"
                width="24"
                height="24"
              />
            </button>
          )}
        </div>
      )}

      <div className="translate-icon">
        <span onClick={toggleTranslationCard}>
          <img className='google-image'
            src= {googletranslate}
            alt="Google Translate"
            width="44"
            height="44"
          />
        </span>
      </div>
    </div>
  );
};

export default TranslationApp;
