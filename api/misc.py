

# values = (1, False)
# print(any(values))



# list = [1, 0, 3, 4, 0]
# print(list)

# for item in list:
#   if item == 0:
#     list.remove(item)
#     list.append(item)

# print(list)


sentence = 'This is a long sentence that you may need to modify.'

sentence_list = sentence.split()
long_index = sentence_list.index('long')

sentence_list.insert(long_index, 'damn')

print(' '.join(sentence_list))