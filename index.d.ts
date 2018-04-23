interface IResult {
  pass: boolean;
  missing: string[];
}
declare const haskey: (object: Object) => (keys: string | string[]) => IResult
export = haskey;
