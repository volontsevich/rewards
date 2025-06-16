const BASE = import.meta.env.VITE_API_URL;
const USER = import.meta.env.VITE_DEMO_USER_ID;

export async function getBalance() {
  const res = await fetch(`${BASE}/users/${USER}/balance`);
  return res.json();
}

export async function getRewards() {
  const res = await fetch(`${BASE}/rewards`);
  return res.json();
}

export async function redeem(rewardId) {
  const res = await fetch(`${BASE}/users/${USER}/redemptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reward_id: rewardId }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${BASE}/users/${USER}/redemptions`);
  return res.json();
}

export async function earn(points) {
  const res = await fetch(`${BASE}/users/${USER}/earn`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ points }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}
