import Delta from 'quill-delta';

export const deltaToText = (delta: Delta): string => {
  return (
    delta?.ops
      ?.map((op) => (typeof op.insert === 'string' ? op.insert : ''))
      .join(' ')
      .trim() ?? ''
  );
};
