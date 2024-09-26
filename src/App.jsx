import { createSignal, Show } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [quote, setQuote] = createSignal('');
  const [loadingQuote, setLoadingQuote] = createSignal(false);
  const [loadingAudio, setLoadingAudio] = createSignal(false);
  const [audioUrl, setAudioUrl] = createSignal('');

  const fetchQuote = async () => {
    setLoadingQuote(true);
    setAudioUrl('');
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: 'Provide an inspiring quote.',
        response_type: 'text',
      });
      setQuote(result.trim());
    } catch (error) {
      console.error('Error fetching quote:', error);
    } finally {
      setLoadingQuote(false);
    }
  };

  const getAudio = async () => {
    setLoadingAudio(true);
    try {
      const result = await createEvent('text_to_speech', {
        text: quote(),
      });
      setAudioUrl(result);
    } catch (error) {
      console.error('Error getting audio:', error);
    } finally {
      setLoadingAudio(false);
    }
  };

  // Fetch a quote on mount
  fetchQuote();

  return (
    <div class="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x flex items-center justify-center p-4 text-gray-800 dark:text-white bg-[400%_400%]">
      <div class="max-w-xl w-full bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6 h-full">
        <h1 class="text-3xl font-extrabold text-purple-600 dark:text-purple-400 text-center">Inspiring Quotes</h1>
        <div class="text-center">
          <Show when={!loadingQuote()} fallback={<p class="text-gray-500 dark:text-gray-400">Loading quote...</p>}>
            <p class="text-3xl font-bold mb-4 animate-fade-in text-center text-shadow">{quote()}</p>
          </Show>
        </div>
        <div class="flex space-x-4">
          <button
            onClick={fetchQuote}
            class={`px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loadingQuote() || loadingAudio() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loadingQuote() || loadingAudio()}
          >
            <Show when={loadingQuote()}>Loading...</Show>
            <Show when={!loadingQuote()}>New Quote</Show>
          </button>
          <button
            onClick={getAudio}
            class={`px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loadingAudio() || loadingQuote() || !quote() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loadingAudio() || loadingQuote() || !quote()}
          >
            <Show when={loadingAudio()}>Loading...</Show>
            <Show when={!loadingAudio()}>Listen</Show>
          </button>
        </div>
        <Show when={audioUrl()}>
          <audio controls src={audioUrl()} class="w-full mt-4" />
        </Show>
      </div>
    </div>
  );
}

export default App;