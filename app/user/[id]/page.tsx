'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import UserServices from '@/services/UserServices';
import { Users } from '@/util/Interfaces';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@mui/material';

// Sobrescreva os URLs dos ícones padrão
const DefaultIcon = L.icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Page() {
  const { id } = useParams();
  const { getUserById } = UserServices();

  const { data: user, isLoading, isError } = useQuery<Users>(['user', id], () => getUserById(Number(id)), {
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <section>
      <div className="card">
        <div className="profile-title">
          <h1>Profile</h1>
        </div>
        <div className="information-profile">
          <h2>Name</h2>
          <p>{user.name}</p>
        </div>
        <div className="information-profile">
          <h2>Phone</h2>
          <p>{user.phone}</p>
        </div>
        <div className="information-profile">
          <h2>Username</h2>
          <p>{user.username}</p>
        </div>
        <div className="information-profile">
          <h2>Website</h2>
          <p>{user.website}</p>
        </div>
        <div className="information-profile-company">
          <h1>Company Information</h1>
          <div>
            <h2>Bs</h2>
            <p>{user.company.bs}</p>
          </div>
          <div>
            <h2>Catch Phrase</h2>
            <p>{user.company.catchPhrase}</p>
          </div>
          <div>
            <h2>Name</h2>
            <p>{user.company.name}</p>
          </div>
        </div>
        <div className="information-profile-address">
          <h1>Address</h1>
          <div>
            <h2>City</h2>
            <p>{user.address.city}</p>
          </div>
          <div>
            <h2>Street</h2>
            <p>{user.address.street}</p>
          </div>
          <div>
            <h2>Suite</h2>
            <p>{user.address.suite}</p>
          </div>
          <div>
            <h2>Zip Code</h2>
            <p>{user.address.zipcode}</p>
          </div>
          <div>
            <MapContainer center={[Number(user.address.geo.lat), Number(user.address.geo.lng)]} zoom={13} style={{ height: '40em', width: '90%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[Number(user.address.geo.lat), Number(user.address.geo.lng)]}>
                <Popup>
                  A marker at [{user.address.geo.lat}, {user.address.geo.lng}]
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
