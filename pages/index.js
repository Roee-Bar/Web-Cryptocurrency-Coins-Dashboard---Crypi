import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      age: e.target.age.value,
    };

    const res = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      setData((prevData) => [...prevData, result.data]);
    }
  };

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name} - {item.age}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="age" placeholder="Age" required />
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}
