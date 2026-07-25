 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }





export function classifyCivicIssue(description, filename) {
  const desc = description.toLowerCase();
  
  // 1. Determine Category
  let category = 'other';
  
  const keywords = {
    garbage: ['garbage', 'waste', 'trash', 'litter', 'dump', 'debris', 'smell', 'foul', 'compost', 'bin', 'plastic', 'heap'],
    pothole: ['pothole', 'road', 'crack', 'asphalt', 'pavement', 'hole', 'crater', 'bump', 'street', 'highway', 'footpath', 'sidewalk'],
    streetlight: ['streetlight', 'light', 'lamp', 'bulb', 'dark', 'darkness', 'illuminate', 'wiring', 'pole', 'post'],
    traffic: ['traffic', 'parking', 'jam', 'signal', 'vehicle', 'car', 'bike', 'congestion', 'gridlock', 'crosswalk', 'accident', 'speeding'],
    water_supply: ['water', 'pipe', 'leak', 'tap', 'supply', 'contamination', 'dirty water', 'pressure', 'pipeline', 'drinking'],
    vandalism: ['graffiti', 'paint', 'spray', 'damage', 'vandalism', 'wall', 'poster', 'destroy', 'broken window', 'public space'],
    drainage: ['drain', 'gutter', 'sewage', 'overflow', 'clog', 'waterlogging', 'flood', 'monsoon', 'manhole', 'sludge'],
    other: [],
  };

  // Check file name extension/keywords for cues
  if (filename) {
    const fileWord = filename.toLowerCase();
    for (const [cat, words] of Object.entries(keywords)) {
      if (words.some(w => fileWord.includes(w))) {
        category = cat ;
        break;
      }
    }
  }

  // If no match from file name, match from description
  if (category === 'other') {
    let maxMatch = 0;
    for (const [cat, words] of Object.entries(keywords)) {
      const matchCount = words.filter(word => desc.includes(word)).length;
      if (matchCount > maxMatch) {
        maxMatch = matchCount;
        category = cat ;
      }
    }
  }

  // 2. Determine Severity
  let severity = 'medium';
  
  const criticalWords = ['accident', 'injury', 'emergency', 'danger', 'fatal', 'death', 'hospital', 'collapse', 'fire', 'shock', 'electrocution'];
  const highWords = ['severe', 'major', 'block', 'completely', 'foul', 'unsafe', 'hazard', 'overflowing', 'darkness', 'leakage', 'flooding'];
  const lowWords = ['minor', 'slight', 'small', 'aesthetic', 'minimal', 'cleaning', 'littering', 'annoyance'];

  if (criticalWords.some(w => desc.includes(w))) {
    severity = 'critical';
  } else if (highWords.some(w => desc.includes(w))) {
    severity = 'high';
  } else if (lowWords.some(w => desc.includes(w))) {
    severity = 'low';
  }

  // 3. Generate suggested title
  let title = '';
  const firstSixWords = description.split(/\s+/).slice(0, 6).join(' ');
  
  if (category === 'garbage') {
    title = `Garbage clearance required: ${firstSixWords}...`;
  } else if (category === 'pothole') {
    title = `Road repair / pothole: ${firstSixWords}...`;
  } else if (category === 'streetlight') {
    title = `Streetlight issue: ${firstSixWords}...`;
  } else if (category === 'traffic') {
    title = `Traffic / Parking issue: ${firstSixWords}...`;
  } else if (category === 'water_supply') {
    title = `Water supply pipeline: ${firstSixWords}...`;
  } else if (category === 'vandalism') {
    title = `Vandalism / Property damage: ${firstSixWords}...`;
  } else if (category === 'drainage') {
    title = `Drainage overflow / Waterlogging: ${firstSixWords}...`;
  } else {
    title = `Civic concern: ${firstSixWords}...`;
  }

  // Clean title ellipses if short description
  if (description.split(/\s+/).length <= 6) {
    title = title.replace('...', '');
  }

  return { category, severity, title };
}









export function findDuplicateReport(
  city, 
  category, 
  reports
) {
  if (!city || !category || !reports || reports.length === 0) return null;
  
  const cleanCity = city.trim().toLowerCase();
  
  // Find active issues in the same city and category
  const match = reports.find(r => 
    r.status !== 'resolved' &&
    r.status !== 'rejected' &&
    r.category === category &&
    _optionalChain([r, 'access', _ => _.city, 'optionalAccess', _2 => _2.trim, 'call', _3 => _3(), 'access', _4 => _4.toLowerCase, 'call', _5 => _5()]) === cleanCity
  );

  return match ? {
    id: match.id,
    report_number: match.report_number,
    title: match.title,
    status: match.status,
    created_at: match.created_at,
  } : null;
}
