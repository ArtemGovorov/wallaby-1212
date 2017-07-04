it('should work', () => {
  var action = {a: 1, b: 2};
  var p = {...action};
  expect(p.a).toBe(1);
});