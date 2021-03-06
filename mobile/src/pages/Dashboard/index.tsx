import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  ProvidersList,
  ProvidersListTitle,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProfileInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,

  UseAvatar,
  UserName
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  const navigateToProfile = useCallback(() => {
    //navigate('Profile');
    signOut();
  }, [signOut]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, [])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => {navigateToProfile}}>
          <UseAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabelereiros</ProvidersListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer onPress={() =>
            {navigateToCreateAppointment(provider.id)}}>
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProfileInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000"/>
                <ProviderMetaText>Segunda ?? sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000"/>
                <ProviderMetaText>8h ??s 18h</ProviderMetaText>
              </ProviderMeta>
            </ProfileInfo>
          </ProviderContainer>
        )} />
    </Container>
  )
}

export default Dashboard;
