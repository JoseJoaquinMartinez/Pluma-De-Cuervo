export default function getLastFiveBlogs() {
  const data = fetch(process.env.BACKEND_URL + "/get-last-five-blogs");
}
