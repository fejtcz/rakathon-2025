<script>
import { apiFetch } from '$lib/api';
import { redirect } from '@sveltejs/kit';

 export let users = [
   {
      id: '1',
      name: 'MUDr. Jan Novák',
      avatar: 'https://i.pravatar.cc/100?img=1',
      response: 'accepted',
      presence: null
    },
    {
      id: '2',
      name: 'PhDr. Anna Malá',
      avatar: 'https://i.pravatar.cc/100?img=2',
      response: 'accepted',
      presence: null
    },
    {
      id: '3',
      name: 'Bc. Tomáš Hladký',
      avatar: 'https://i.pravatar.cc/100?img=3',
      response: 'no-response',
      presence: null
    },
    {
      id: '4',
      name: 'Ing. Petra Černá',
      avatar: 'https://i.pravatar.cc/100?img=4',
      response: 'accepted',
      presence: null
    },
    {
      id: '5',
      name: 'Mgr. Jakub Šedý',
      avatar: 'https://i.pravatar.cc/100?img=5',
      response: 'declined',
      presence: null
    }   
  ];

function setPresence(id, state) {
    users = users.map(u => u.id === id ? { ...u, presence: state } : u);
  }

  function getResponseColor(response) {
    switch (response) {
      case 'accepted': return 'bg-green-500 text-white';
      case 'declined': return 'bg-red-500 text-white';
      case 'no-response': return 'bg-gray-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  }

  function getResponseText(response) {
    switch (response) {
      case 'accepted': return 'Potvrdil';
      case 'declined': return 'Zamítl';
      case 'no-response': return 'Bez reakce';
      default: return '—';
    }
  }
</script>