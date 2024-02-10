"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  BlockLanguage,
  Button,
  ButtonReListen,
  Container,
  ContainerLanguage,
  ContainerTranscription,
  CountryIcon,
  Spinner,
  TextTranslation,
  Title,
} from "./styles";
import { IoIosMic } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { MdHeadphones } from "react-icons/md";
import sound from "../assets/sound.gif";

export default function Home() {
  const [translatedText, setTranslatedText] = useState<string | null>();
  const [speechcompleted, setSpeechcompleted] = useState(false);
  const [translationOrder, setTranslationOrder] = useState("pt-br|en");
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const voices = window.speechSynthesis.getVoices();
  const utterance = useMemo(() => new SpeechSynthesisUtterance(), []);

  const translateText = async () => {
    try {
      setSpeechcompleted(false);
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${transcript}&langpair=${translationOrder}`
      );
      const data = await response.json();

      if (data.responseStatus === 200) {
        handleSpeech(data.responseData.translatedText);
      } else {
        console.error("Erro na tradução:", data.responseStatus);
      }
    } catch (error) {
      console.error("Erro na solicitação de tradução:", error);
    }
  };

  const handleSpeech = (text: string) => {
    setTranslatedText(text);
    setSpeechcompleted(true);
    if ("speechSynthesis" in window) {
      utterance.text = text;
      if (translationOrder === "pt-br|en") {
        const englishVoice = voices.find((voice) =>
          voice.lang.startsWith("en")
        );
        utterance.voice = englishVoice || voices[0];
      } else {
        const portugueseVoice = voices.find((voice) =>
          voice.lang.startsWith("pt")
        );
        utterance.voice = portugueseVoice || voices[0];
      }

      utterance.onend = () => {
        setSpeechcompleted(true);
      };
      speechSynthesis.speak(utterance);
    } else {
      alert("Desculpe, seu navegador não suporta a API de fala.");
    }
    setSpeechcompleted(false);
  };

  useEffect(() => {
    if (listening === false) {
      translateText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening]);

  useEffect(() => {
    const englishVoice = voices.find((voice) => voice.lang.startsWith("en"));
    utterance.voice = englishVoice || voices[0];
  }, [utterance, voices]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <Container>
      <Title>Tradutor</Title>
      {translationOrder === "pt-br|en" ? (
        <ContainerLanguage>
          <BlockLanguage>
            <CountryIcon src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/2-bandeira-do-brasil.jpg" />
          </BlockLanguage>
          <BlockLanguage
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTranslationOrder("en|pt-br");
            }}
          >
            <FaExchangeAlt size={25} color="#000" />
          </BlockLanguage>
          <BlockLanguage>
            <CountryIcon src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg" />
          </BlockLanguage>
        </ContainerLanguage>
      ) : (
        <ContainerLanguage>
          <BlockLanguage>
            <CountryIcon src="https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg" />
          </BlockLanguage>

          <BlockLanguage
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTranslationOrder("pt-br|en");
            }}
          >
            <FaExchangeAlt size={25} color="#000" />
          </BlockLanguage>
          <BlockLanguage>
            <CountryIcon src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/2-bandeira-do-brasil.jpg" />
          </BlockLanguage>
        </ContainerLanguage>
      )}

      <Button
        onClick={() => {
          SpeechRecognition.startListening();
          setTranslatedText(null);
        }}
      >
        {listening && <Spinner />}
        <IoIosMic size={50} color="#FFF" />
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {transcript && (
          <TextTranslation>
            <strong>Fala original:</strong> {transcript}
          </TextTranslation>
        )}

        {translatedText && transcript && (
          <ContainerTranscription>
            <TextTranslation>
              <strong>Fala traduzida:</strong> {translatedText}
            </TextTranslation>
            <ButtonReListen onClick={() => handleSpeech(translatedText)}>
              {speechcompleted ? (
                <TextTranslation>
                  <MdHeadphones size={20} color="#FFF" /> Ouvir novamente
                </TextTranslation>
              ) : (
                <Image src={sound} alt="sound image" />
              )}
            </ButtonReListen>
          </ContainerTranscription>
        )}
      </div>
    </Container>
  );
}
