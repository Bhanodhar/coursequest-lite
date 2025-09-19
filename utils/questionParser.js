// utils/questionParser.js

function parseQuestion(question) {
  const filters = {};
  const lowerQuestion = question.toLowerCase();

  // RULE 1: Extract Department
  const departments = {
    'computer science': 'Computer Science',
    'cs': 'Computer Science',
    'math': 'Mathematics',
    'art': 'Arts',
    'business': 'Business',
    'chemistry': 'Chemistry',
    'physics': 'Physics'
  };

  for (const [keyword, department] of Object.entries(departments)) {
    if (lowerQuestion.includes(keyword)) {
      filters.department = department;
      break;
    }
  }

  // RULE 2: Extract Level (UG/PG)
  if (lowerQuestion.includes('ug') || lowerQuestion.includes('undergrad')) {
    filters.level = 'UG';
  } else if (lowerQuestion.includes('pg') || lowerQuestion.includes('grad') || lowerQuestion.includes('masters')) {
    filters.level = 'PG';
  }

  // RULE 3: Extract Delivery Mode
  if (lowerQuestion.includes('online')) {
    filters.delivery_mode = 'online';
  } else if (lowerQuestion.includes('offline') || lowerQuestion.includes('on campus')) {
    filters.delivery_mode = 'offline';
  } else if (lowerQuestion.includes('hybrid')) {
    filters.delivery_mode = 'hybrid';
  }

  // RULE 4: Extract Number Ranges with better context detection
  // Find maximum fee
  const maxFeeMatch = lowerQuestion.match(/(?:under|below|less than|max|maximum|up to|fee.*?)\s*(\d+)\s*(?:inr|rs|₹|fee|price|cost)?/i);
  if (maxFeeMatch && (lowerQuestion.includes('fee') || lowerQuestion.includes('price') || lowerQuestion.includes('cost') || 
      lowerQuestion.includes('inr') || lowerQuestion.includes('rs') || lowerQuestion.includes('₹'))) {
    filters.max_fee = parseInt(maxFeeMatch[1], 10);
  }

  // Find minimum rating
  const minRatingMatch = lowerQuestion.match(/(?:above|over|at least|min|minimum|greater than|rating.*?)\s*(\d+(?:\.\d+)?)/i);
  if (minRatingMatch && (lowerQuestion.includes('rating') || lowerQuestion.includes('star') || 
      lowerQuestion.includes('rate'))) {
    filters.min_rating = parseFloat(minRatingMatch[1]);
  }

  // Find maximum rating
  const maxRatingMatch = lowerQuestion.match(/(?:below|under|less than|max|maximum|rating.*?)\s*(\d+(?:\.\d+)?)\s*(?:stars|rating)?/i);
  if (maxRatingMatch && (lowerQuestion.includes('rating') || lowerQuestion.includes('star') || 
      lowerQuestion.includes('rate'))) {
    filters.max_rating = parseFloat(maxRatingMatch[1]);
  }

  // Find credit-related numbers
  const creditsMatch = lowerQuestion.match(/(\d+)\s*credit/i);
  if (creditsMatch && lowerQuestion.includes('credit')) {
    filters.credits = parseInt(creditsMatch[1], 10);
  }

  // FALLBACK: If we found a number but no clear context
  const anyNumberMatch = lowerQuestion.match(/(\d+)/);
  if (anyNumberMatch && Object.keys(filters).length === 0) {
    const number = parseInt(anyNumberMatch[1], 10);
    if (number > 1000) {
      filters.max_fee = number;
    } else if (number <= 5 && lowerQuestion.match(/(\d+\.\d+)/)) {
      filters.min_rating = parseFloat(anyNumberMatch[1]);
    }
  }

  console.log(`Parsed question: "${question}" ->`, filters);
  return filters;
}

module.exports = { parseQuestion };