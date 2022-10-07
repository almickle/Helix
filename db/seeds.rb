# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).


puts "Seeding users"

almickle = User.create(username: 'almickle', password: 'password', email: 'michaelcdear@gmail.com')

puts "Complete"

puts "Seeding libraries"

Library.create(user_id: almickle.id)

puts "Complete"

puts "Seeding genes"

Gene.create(symbol: 'MIER1', taxon: 'Homo sapiens', library_id: almickle.id)
Gene.create(symbol: 'OXT', taxon: 'Homo sapiens', library_id: almickle.id)
Gene.create(symbol: 'FOXP2', taxon: 'Homo sapiens', library_id: almickle.id)
gene = Gene.create(symbol: 'AKT1', taxon: 'Homo sapiens', library_id: almickle.id)

puts "Complete"

puts "Seeding annotations"

Annotation.create(gene_id: gene.id, title: 'Feature', body: 'This is a custom annotation', begin: 12, end: 32)

puts "Complete"

puts "Data seeded"