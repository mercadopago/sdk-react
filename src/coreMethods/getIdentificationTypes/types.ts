export type IdentificationType = {
  /**
   * Identification type id.
   * 
   * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get API Reference - identification_types}.
   */
  id: string,

  /**
   * Identification type name.
   * 
   * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get API Reference - identification_types}.
   */
  name: string,

  /**
   * Identification number data type.
   * 
   * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get API Reference - identification_types}.
   */
  type: string,

  /**
   * Identification number min length.
   * 
   * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get API Reference - identification_types}.
   */
  min_length: number,

  /**
   * Identification number max length.
   * 
   * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get API Reference - identification_types}.
   */
  max_length: number
}