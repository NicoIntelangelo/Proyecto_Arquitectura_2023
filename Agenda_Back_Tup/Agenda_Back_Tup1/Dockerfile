FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src

COPY . .

RUN dotnet publish "Agenda_Back_Tup1.csproj" -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app

COPY --from=build /app .

#EXPOSE 7076:80

ENTRYPOINT ["dotnet", "Agenda_Back_Tup1.dll"]
                                                
