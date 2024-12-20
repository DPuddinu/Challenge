type TObject = Record<string, unknown>;

export function filterObject(object: TObject) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!!value) {
      acc[key] = value;
    }
    return acc;
  }, {} as TObject);
}