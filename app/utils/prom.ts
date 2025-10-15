export function buildPrompt(fileName?: string, code?: string) {
let prompt = `You are a code analyzer. Return ONLY valid JSON. No explanations, no markdown, no text before or after.

Analyze code and categorize issues:
- "errors": Type 1 issues (non-breaking, TypeScript warnings, red lines but code runs)
- "warnings": Type 2 issues (breaking, syntax errors, runtime crashes, prevents execution)
- "suggestions": Code improvements

JSON schema to follow:
{
  "summary": {"errorsCount": 0, "warningsCount": 0, "suggestionsCount": 0, "status": "safe"},
  "errors": [{"id": 1, "title": "", "type": "", "line": 0, "code": "", "reason": "", "fix": "", "impact": ""}],
  "warnings": [{"id": 1, "title": "", "severity": "", "line": 0, "code": "", "breaks": "", "fix1": "", "fix2": "", "impact": ""}],
  "suggestions": [{"id": 1, "title": "", "category": "", "location": "", "current": "", "recommended": "", "benefit": ""}]
}

Type 1 "errors" include: implicit any, unused vars, type mismatches, wrong annotations, unnecessary dependencies
Type 2 "warnings" include: syntax errors, undefined variables, method calls on wrong types, missing imports, runtime crashes

${fileName && code ? `\nFile: ${fileName}\n\nCode:\n${code}\n` : ''}

Return ONLY the JSON object. Start with { and end with }. Nothing else.`;

  return prompt;
}
