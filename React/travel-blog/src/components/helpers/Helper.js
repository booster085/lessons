export const sanitizeInput = (input) =>
    input.replace(/<script>|<\/script>|onerror/ig, '')