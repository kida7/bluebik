interface DiseaseFrequencyRequest {
  /**
   * Loại
   */
  type: string;
  /**
   * ca bệnh
   */
  a: number;
  /**
   * tổng đàn nguy cơ
   */
  n: number;
  /**
   * Hệ số nhân
   */
  mult: number;
  /**
   * Khoảng tin cậy
   */
  conf: number;
}
export default DiseaseFrequencyRequest;
