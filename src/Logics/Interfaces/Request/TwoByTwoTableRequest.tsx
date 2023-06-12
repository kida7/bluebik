interface TwoByTwoTableRequest {
  /**
   * loại hình phân tích
   */
  typeAnaly: string;
  /**
   * Loại
   */
  type: string;
  /**
   * bệnh phơi nhiễm
   */
  a: number;
  /**
   * không bệnh phơi nhiễm
   */
  b: number;
  /**
   * bệnh không phơi nhiễm
   */
  c: number;
  /**
   * không bệnh không phơi nhiễm
   */
  d: number;
  /**
   * Hệ số nhân
   */
  mult: number;
  /**
   * Khoảng tin cậy
   */
  conf: number;
  /**
   * bao nhiếu số sau dấu phẩy thập phân
   */
  decPlaces: number;
}
export default TwoByTwoTableRequest;
