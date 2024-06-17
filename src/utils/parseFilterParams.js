export const parseContactType = (contactType) => {
  const contact = typeof contactType === 'string';
  if (!contact) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseIsFavourite = (isFavourite) => {
  const isBoolean = isFavourite === 'true' || isFavourite === 'false';

  if (typeof isFavourite === 'boolean') return isFavourite;


  if (!isBoolean) return;

  return isFavourite === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
