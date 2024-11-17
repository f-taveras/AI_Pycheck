import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import tutorials from '$lib/data/tutorials.json';

export const load: PageLoad = ({ params }) => {
  const tutorialId = parseInt(params.id);

  // Validate the ID
  if (isNaN(tutorialId)) {
    throw error(400, 'Invalid tutorial ID');
  }

  // Find the tutorial by ID
  const tutorial = tutorials.find((t) => t.id === tutorialId);

  // Handle case when tutorial is not found
  if (!tutorial) {
    throw error(404, 'Tutorial not found');
  }

  return {
    tutorial,
  };
};
