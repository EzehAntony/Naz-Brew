export async function allData() {
  const res = await fetch("/api/items/find");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
