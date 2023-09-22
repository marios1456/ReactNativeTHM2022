import { TicketList } from './ticketList';
import { NewTicketButton } from './newTicketButton.js';
import { ScrollView } from 'react-native';

export function HomeScreen({data}) {
  return (
    <ScrollView className="bg-gray-100 h-full">
      <TicketList />
      <NewTicketButton />
    </ScrollView>
  );
}


