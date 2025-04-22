import { supabase } from '../lib/supabase';

export const processTextToSteps = async (text: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('process-text', {
      body: { text }
    });

    if (error) throw error;
    return data.steps;
  } catch (error) {
    console.error('Error processing text:', error);
    // Fallback to basic processing if the API call fails
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => {
        const firstWord = s.split(' ')[0].toLowerCase();
        if (/^(analyze|create|develop|ensure|identify|implement|make|prepare|review|update)/i.test(s)) {
          return s;
        }
        return `Review ${s.charAt(0).toLowerCase() + s.slice(1)}`;
      });
  }
};